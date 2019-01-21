const getBondsData = async ({date, isins}) => { 
    
    let cache = []; //[ data: string, isins: { isin: string, data: any }[] ]
    
    let dateCache = cache.find(cachedObj => cachedObj.date === date);
    
    let nonExistIsins = [];
    let cachedIsins = [];
    
    if( dateCache ){ // {date, isins:[{isin: string, data: {}}]}
        // проверяем все ли запрошенные исины есть в кеше
        nonExistIsins = isins.filter( i => dateCache.isins.some( dc => dc.isin !== i)); // string[]
        cachedIsins = isins.filter( i => dateCache.isins.some( dc => dc.isin === i )).map(isin_string => dateCache.isins.find(item => item.isin === isin_string)); //isins[]
    }
    
    //если у нас все данные по исинам есть в кеше, не запрашиваем их у API а сразу возвращаем промис  
    if(!nonExistIsins.lenght) return await Promise.resolve(cachedIsins.map(ci => ci.isins)); //возвращаем только исины (без даты) 
       
    const result = await http.post({ 
        //запрос тоже отправляется оптимизированный, только на недостающие isins
        url: `/bonds/${date}`, body: nonExistIsins }
        ).then((httpresult)=>{
            //проверяем есть ли кеш на эту дату подмешиваем полученные результаты
            if( dateCache ) dateCache.isins = dateCache.isins ? [...dateCache.isins, ...httpresult] : [...httpresult];
            else cache.push({date, isins: httpresult}) // если в кеше нет записей на эту дату
        
        //к ответу от API подмешиваем кешированные данные.
        return [...httpresult, ...cachedIsins.isins];
    }); 

    //возвращаем промис в систему
    return result;

}; 



/*
Пример вызова функции: 
getBondsData({ 
date: '20180120', isins: ['XS0971721963', 'RU000A0JU4L3'] }); 


Результат: 
[{ isin: 'XS0971721963', 
data: {...} }, { isin: 'RU000A0JU4L3', 
data: {...} }] 
*/