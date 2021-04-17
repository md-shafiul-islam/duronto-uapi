import { helperIsEmpty } from "./helperAction";

class LocalDataStore  {
    constructor(){
        this.localStore = window.localStorage;
        this.rndPriceFlights = {};
        this.preSetPriceOptions = {};
    }

    setPriceRoundTripFlights = (rndPriceFlights)=>{

        if(!helperIsEmpty(rndPriceFlights)){
            this.localStore.setItem("rndPriceOptions", JSON.stringify(rndPriceFlights));
        }
    }

    getPriceRoundTripFlights = ()=>{

        if(this.hasRndPriceOptions()){
            return this.rndPriceFlights;
        }

        return null;
        
    }

    hasRndPriceOptions = ()=>{
        let rndPriceFlightsStr = this.localStore.getItem("rndPriceOptions");

        if(rndPriceFlightsStr){
            this.rndPriceFlights = JSON.parse(rndPriceFlightsStr);
            return true;
        }
        return false;
    }

    setPreSetRndPriceDetails = (preSetPriceOptions)=>{
        if(!helperIsEmpty(preSetPriceOptions)){
            this.localStore.setItem("preSetRndPriceOptions", JSON.stringify(preSetPriceOptions));
        }
    }

    getPreSetRndPriceDetails = ()=>{
        if(this.hasPreSetRndOptions()){
            return this.preSetPriceOptions;
        }
        return null;
    }

    hasPreSetRndOptions = ()=>{

        let preSetOptionsStr = this.localStore.getItem("preSetRndPriceOptions");

        if(preSetOptionsStr){
            this.preSetPriceOptions = JSON.parse(preSetOptionsStr);
            return true;
        }
        
        return false;
    }

}

export  const localDataStore = new LocalDataStore();
