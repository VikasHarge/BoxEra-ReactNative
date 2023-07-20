import { ColorType, Estimate } from "../../../../../store/types";
import * as Yup from 'yup'

export const estimateInitial: Estimate = {
    client_name: '',
    box_name: "",
    outer_height: undefined,
    outer_length: undefined,
    outer_width: undefined,
    ply_number: undefined,
    bottom_bf: undefined,
    bottom_gsm: undefined,
    mid_bf: undefined,
    mid_ff: undefined,
    mid_gsm: undefined,
    top_bf: undefined,
    top_gsm: undefined,
    color_type: undefined,
    is_lamination: undefined,
    box_quantity: undefined,
    profit: undefined,
    tax:undefined,
    transportation_charge:undefined,
    wastage:undefined,
    cost_per_box : undefined,
    bottom_paper_rate : undefined,
    top_paper_rate : undefined,
    mid_paper_rate : undefined,
    conversion_cost : undefined,
    lamination_factor : undefined,
}


export const estimateSchema = Yup.object().shape({
    client_name: Yup.string().required("required"),
    box_name: Yup.string().required("required"),
    outer_height: Yup.string().required("required"),
    outer_length: Yup.string().required("required"),
    outer_width: Yup.string().required("required"),
    ply_number: Yup.string().required("required"),
    bottom_bf: Yup.string().required("required"),
    bottom_gsm: Yup.string().required("required"),
    mid_bf: Yup.string().required("required"),
    mid_ff: Yup.string().required("required"),
    mid_gsm: Yup.string().required("required"),
    top_bf: Yup.string().required("required"),
    top_gsm: Yup.string().required("required"),
    color_type: Yup.string().required("required"),
    is_lamination: Yup.boolean().required("required"),
    box_quantity: Yup.string().required("required"),
    profit: Yup.string().required("required"),
    tax:Yup.string().required("required"),
    transportation_charge:Yup.string().required("required"),
    wastage:Yup.string().required("required"),
    bottom_paper_rate : Yup.string().required("required"),
    top_paper_rate : Yup.string().required("required"),
    mid_paper_rate : Yup.string().required("required"),
    conversion_cost : Yup.string().required("required"),
    lamination_factor: Yup.string().when("lamination_type", ([lamination_type], schema)=>{
        return lamination_type === true ? schema.required("Required") : schema.optional()
    })

})

export const laminationOptions : {label : string, value : boolean}[] = [ {label : "No", value : false}, {label : 'Yes', value : true},]
export const isColorOptions : {label : string, value : boolean}[] = [ {label : "No", value : false}, {label : 'Yes', value : true},]

export const plyOptions = [{ label: '3 Ply', value: 3 }, { label: '5 Ply', value: 5 }, { label: '7 Ply', value: 7 }, { label: '9 Ply', value: 9 }]

export const ffOptions = [{ label: '1.5', value: 1.5 }, { label: '1.8', value: 1.8 },]

export const gsmOptions = [
    {
        label: "100",
        value: 100
    },
    {
        label: "120",
        value: 120
    },
    {
        label: "140",
        value: 140
    },
    {
        label: "150",
        value: 150
    },
    {
        label: "180",
        value: 180
    },
    {
        label: "200",
        value: 200
    },
    {
        label: "230",
        value: 230
    },
    {
        label: "250",
        value: 250
    },

    {
        label: "270",
        value: 270
    },
    {
        label: "300",
        value: 300
    },
    {
        label: "350",
        value: 350
    },


]