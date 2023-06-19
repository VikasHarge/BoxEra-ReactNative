import { Estimate } from "../../store/types"

export const getPlyFactor = (plyNum: number) => {
    return (plyNum - 1) / 2
}
 
export const cuttingLength = (box: Estimate) => {
    if (!box.outer_length || !box.outer_width || !box.outer_height) {
        return 0
    }
    const lengthInInch = (Number(box.outer_length) + Number(box.outer_width) + 1 + 1)
    return Number(lengthInInch.toFixed(2))
}

export const cuttingHeight = (box: Estimate) => {
    if (!box.outer_length || !box.outer_width || !box.outer_height) {
        return 0
    }
    const heightInInch = (Number(box.outer_height) + Number(box.outer_width) + 1)
    return Number(heightInInch.toFixed(2))
}

export const sheetArea = (box: Estimate) => {

    const cuttinglength = cuttingLength(box);
    const cuttingheight = cuttingHeight(box);
    const sheetArea = (Number(cuttinglength) * Number(cuttingheight)) / 1550
    return Number(sheetArea.toFixed(2))
}
export const boxWeight = (box: Estimate) => {

    const cuttinglength = cuttingLength(box);
    const cuttingheight = cuttingHeight(box);
    const sheetArea = (Number(cuttinglength) * Number(cuttingheight)) / 1550
    const topSheetWeight = Math.ceil(sheetArea * Number(box.top_gsm))
    const middleSheetWeight = Math.ceil(sheetArea * Number(box.mid_gsm) * Number(box.mid_ff))
    const bottomSheetWeight = Math.ceil(sheetArea * Number(box.bottom_gsm))
    const plyFactor = getPlyFactor(Number(box.ply_number))
    const totalWeight = topSheetWeight + ((middleSheetWeight + bottomSheetWeight) * plyFactor)
    return totalWeight * 2
}


export const totalGsm = (box: Estimate) => {

    if (!box.outer_length || !box.outer_width || !box.outer_height) {
        return null
    }

    const topGsm = Number(box.top_gsm);
    const midGsm = Number(box.mid_gsm) * Number(box.mid_ff);
    const bottomGsm = Number(box.bottom_gsm)
    const plyFactor = getPlyFactor(Number(box.ply_number))
    const totalGms = topGsm + ((midGsm + bottomGsm) * plyFactor)
    return totalGms
}

export const paperCostPerBox = (box: Estimate) => {

    const paperArea = sheetArea(box) || 0;

    const topPaperCost = paperArea * Number(box.top_gsm) * (Number(box.top_paper_rate) / 1000)
    const midPaperCost = paperArea * Number(box.top_gsm) * (Number(box.mid_paper_rate) / 1000) * (Number(box.mid_ff))
    const bottomPaperCost = paperArea * Number(box.bottom_gsm) * (Number(box.bottom_paper_rate) / 1000)
    const plyFactor = getPlyFactor(Number(box.ply_number))
    const totalPaperCost = topPaperCost || 0 + ((midPaperCost || 0 + bottomPaperCost || 0) * plyFactor)

    return Number(totalPaperCost * 2).toFixed(2)

}

export const printingCost = (box: Estimate) => {
    switch (box.color_type) {
        case 'single_color': if (Number(box.box_quantity) < 500) {
            return 700
        } else {
            return (Number(box.box_quantity) * 1.4)
        };
        case 'two_color': if (Number(box.box_quantity) < 500) {
            return 1400
        } else {
            return (Number(box.box_quantity) * 2.8)
        };
        case 'four_color': if (Number(box.box_quantity) < 500) {
            return 5000
        } else {
            return (Number(box.box_quantity) * 5)
        };
        case 'no_color': 0;
        default: 0
    }
    return 0

}

export const laminationCost = (box: Estimate) => {
    if (!box.outer_length || !box.outer_width || !box.outer_height) {
        return 0
    }
    if (!box.is_lamination) {
        return 0
    }

    const cuttinglength = cuttingLength(box);
    const cuttingheight = cuttingHeight(box);
    const laminationCost = (cuttinglength * cuttingheight) * Number(box.lamination_factor)
    return Math.ceil(laminationCost * 2)
}

export const conversionCost = (box: Estimate) => {
    const boxWt = boxWeight(box) / 1000;
    const convCost = Number(box.conversion_cost) * Number(boxWt)

    return Number(convCost).toFixed(2)
}

export const getBoxMfgCost = (box: Estimate) => {
    const printigCostPerBox = Number(printingCost(box)) / Number(box.box_quantity) | 0
    const convCost = Number(conversionCost(box))
    const lamnsnCost = Number(laminationCost(box))
    const paperCost = Number(paperCostPerBox(box))
    const tranportCharge = Number(box.transportation_charge || 0)
    const totalMfgCost = printigCostPerBox + convCost + lamnsnCost + paperCost + tranportCharge

    return Math.ceil(totalMfgCost)
}

export const getProfit = (box : Estimate)=>{
    const totalMfgCost = Number(getBoxMfgCost(box) || 0);

    const profitValue = (totalMfgCost*Number(box.profit))/100

    return profitValue
}

export const getBoxPrice = (box : Estimate)=>{
    const boxMfgCost = Number(getBoxMfgCost(box))
    const boxProfit = Number(getProfit(box))

    const boxPrice = boxMfgCost + boxProfit
    return boxPrice
}