import { BrickType } from "src/models/brick/brick-type-interface";
import apiCoreService from "../core/core-servie";


const getBricks = async ()=> {
    
      return  apiCoreService.get<BrickType[]>('/brick/all');  
  };

  const brickTypeService={
    getBricks
  }

  export default brickTypeService;