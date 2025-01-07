import AsyncStorage from "@react-native-async-storage/async-storage"


export async function getGender() {
    try {
        const gender = await AsyncStorage.getItem('Gender')
        
        
        return gender || 'male'
    } catch (error) {
        console.error('Error getting gender:', error)
        return 'male' 
    }
}
export async function storeName(name){
    try{
        if(name){
            await AsyncStorage.setItem('Name',name);
            console.log(name)
        return;
        }else{
            const StoredName=await AsyncStorage.getItem('Name');
            return StoredName;
        }
    }catch(error){
        console.error('Error At name StoreIng',eror)
    }

}
export async function getTarget() {
    const gender = await getGender();
    let age = await AsyncStorage.getItem("Age");
    age = parseInt(age, 10); // Ensure `age` is parsed as an integer
    console.log(typeof age); // Debugging to ensure type is correct

    let target = 0;

    if (age < 4) {
        target = 1000;
    } else if (age >= 4 && age < 8) {
        target = 1200;
    } else if (age >= 8 && age < 13) {
        target = 1600;
    } else if (age >= 13 && age <= 18 && gender === 'male') {
        target = 1900;
    } else if (age >= 13 && age <= 18 && gender === 'female') {
        target = 1600;
    } else if (age >= 19 && gender === 'male') {
        target = 3700;
    } else if (age >= 19 && gender === 'female') {
        target = 2700;
    } else {
        console.log("Age or gender does not match any category");
    }

    return target;
}


export async function getCustomWaterTake(custom=100) {
    try {
        await AsyncStorage.setItem('CustomWaterTake',custom.toString())
        const customWaterTake = await AsyncStorage.getItem('CustomWaterTake')
        const value = parseInt(customWaterTake) 
      
        return value
    } catch (error) {
        console.error('Error getting custom water take:', error)
        return 100 
    }
}


export  async function getWeight(){
 try{
    const Weight=await AsyncStorage.getItem('weight');
    // console.log(Weight)
    return Weight;
 }catch(error){
    console.log('error Getting at Weight',error)
 }
}


export async function getwater(){
    try{
        const water=await AsyncStorage.getItem('WaterTaken')
        const value=parseInt(water)
        return value ? value : 0;
    }catch(error){
        console.log('error getting water',error)
    }
}

export async function putwater(waterTaken) {
    try{
        await AsyncStorage.setItem('WaterTaken',waterTaken.toString())
        
    }catch(error){
        console.log('error',error)
    }
}


export  async  function RemoveOutDatedData(){
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const FormatData = async (newRecords) => {
       if(newRecords){
        const existingData = await AsyncStorage.getItem('ALLDAYSRECORDS');
        
        let allRecords = existingData ? JSON.parse(existingData) : [];
        
        
        allRecords.push(newRecords);
        
        
        
        await AsyncStorage.setItem('ALLDAYSRECORDS', JSON.stringify(allRecords));
       }
    }

    const waterRecords = await AsyncStorage.getItem('waterRecords');
    const parsedRecords = JSON.parse(waterRecords);
    await FormatData(parsedRecords);
    // const data=await AsyncStorage.getItem('waterRecords')
    // console.log('data',data)
    const currentDate = new Date();
    const date = formatDate(currentDate);

    if (parsedRecords[0].date !== date) {
        await AsyncStorage.removeItem('WaterTaken');
        await AsyncStorage.removeItem('waterRecords');
        
        // await AsyncStorage.clear();
    }
}

// export async function ResetData() {
//     await AsyncStorage.removeItem('weight');
//     await AsyncStorage.removeItem('waterRecords');
//     await AsyncStorage.removeItem('WaterTaken');
//     await AsyncStorage.removeItem('Gender');
//     await AsyncStorage.removeItem('ALLDAYSRECORDS')
    
// }
export async function ReminderData( ReminderData){
    if(ReminderData){
        await AsyncStorage.setItem('ReminderData',ReminderData);
      
        return;
    }else{
        const reminderData=await AsyncStorage.getItem('ReminderData');
        
        return reminderData;
    }

} 


export async function customInTakeGoal(customIntakeGoal){
    if(customIntakeGoal){
        await AsyncStorage.setItem('customInTakeGoal',customIntakeGoal.toString());
        return;
    }else{
        const SavedInTakeGoal=await AsyncStorage.getItem('customInTakeGoal');
        
        // console.log('savedIntakeGoal',SavedInTakeGoal)
        return SavedInTakeGoal;
    }
}


export async function FormatDataToDataBase() {
    const Gender=await AsyncStorage.getItem('Gender');
    const Name=await AsyncStorage.getItem('Name');
    const IntakeGoal=await AsyncStorage.getItem('IntakeGoal');
    const CustomWaterTake=await AsyncStorage.getItem('CustomWaterTake');
    const Weight=await AsyncStorage.getItem('weight');
    const ReminderData=await AsyncStorage.getItem('ReminderData');
    const ALLDAYSRECORDS=await AsyncStorage.getItem('ALLDAYSRECORDS');
    const RawData={
        Gender,
        Name,
        IntakeGoal,
        CustomWaterTake,
        Weight,
        ReminderData,
        ALLDAYSRECORDS,

    }
    const Data={
        ...RawData,
        ALLDAYSRECORDS:JSON.parse(RawData.ALLDAYSRECORDS)
    }
    console.log("data We Sending to DataBase",Data)

    
}