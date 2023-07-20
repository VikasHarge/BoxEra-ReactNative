

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
    is_lamination?: boolean,
    is_color?: boolean,
    color_cost?: string,
    lamination_factor?: string,
    box_quantity?: string,
    transportation_charge?: string,
    profit?: string,
    wastage?: string,
    tax?: string,
    price_per_box? : string,
    cost_per_box?: string,
    conversion_cost?: string,

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

export type DeleteBoxPayload = {
    client_name : string,
    box_name : string
}

export type EditBoxPayload = {
    client_name : string,
    edited_box : Estimate,
    box_name : string,

}