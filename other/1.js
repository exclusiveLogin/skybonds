let percentConvert = (rational, limit){ //number[]
    
    rational = rational.slice(0, limit || 10000);  // ограничение на объем массива
    
    return rational.map(i => !!i && (Number(i)/12*100).toFixed(3));
    
}