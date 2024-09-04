export const capitalizeFirstChar=(mySentence)=>{
    
    const words = mySentence.split("-");
    return words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join("-");
}

export const objectKeys = (list) => Object.keys(list);

export const hasDuplicates = (array) =>{
    return (new Set(array)).size !== array.length;
}
export const checkForDuplicateQuestions = (questions) => {
    const questionTexts = questions.map(q => q.question);
    const duplicateQuestions = questionTexts.filter((item, index) => 
        questionTexts.indexOf(item) !== index
    );
    return [...new Set(duplicateQuestions)]; 
};