export type ColorType = "no_color" | "single_color" | "two_color" | "four_color"

export type Estimate = {
    client_name : string,
    box_name : string,
    outer_length? : string,
    outer_width? : string,
    outer_height? : string,
    ply_number? : number,
    top_bf? : string,
    top_gsm? : string,
    top_paper_rate?:string,
    mid_bf? : string,
    mid_gsm? : string,
    mid_ff? : string,
    mid_paper_rate?:string,
    bottom_bf? : string,
    bottom_gsm? : string,
    bottom_paper_rate?:string,
    color_type? : ColorType,
    lamination_type?: "yes" | "no",
    box_quantity?: string,
    transportation_charge?: string,
    profit?: string,
    wastage?: string,
    tax?: string,
    price_per_box? : string,
    cost_per_box?: string,
}

export type ClientObject = {
    client_name: string,
    client_phone: string,
    client_email: string,
    estimates : Estimate[]
}

export type AddBoxToCllientPaylod =  {
    client_name : string,
    estimate: Estimate
}