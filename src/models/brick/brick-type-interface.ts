export interface BrickType {
    brickTypeId: number;
    name: string;
    rateType: string;
    rate: number;
    institutionId:number;
}


export const mockBrickTypeData:BrickType[]=[  {
    "brickTypeId": 1,
    "name": "1 Number ",
    "rateType": "P",
    "rate": 0.0,
    "institutionId": 1
},
{
    "brickTypeId": 3,
    "name": "2 Number",
    "rateType": "P",
    "rate": 0.0,
    "institutionId": 1
},
{
    "brickTypeId": 8,
    "name": "balu",
    "rateType": "C",
    "rate": 100.0,
    "institutionId": 1
},
{
    "brickTypeId": 4,
    "name": "Brick Bat",
    "rateType": "C",
    "rate": 0.0,
    "institutionId": 1
},
{
    "brickTypeId": 5,
    "name": "Jhama",
    "rateType": "C",
    "rate": 0.0,
    "institutionId": 1
},
{
    "brickTypeId": 2,
    "name": "Mitha Pak",
    "rateType": "P",
    "rate": 0.0,
    "institutionId": 1
},
{
    "brickTypeId": 7,
    "name": "Picket",
    "rateType": "C",
    "rate": 0.0,
    "institutionId": 1
},
{
    "brickTypeId": 6,
    "name": "Rabis",
    "rateType": "C",
    "rate": 0.0,
    "institutionId": 1
}];