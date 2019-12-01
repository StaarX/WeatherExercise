let dat= new Date();
var date={
    year: dat.getFullYear(),
    month: dat.getMonth()+1,
    day: dat.getDate()
};

function main(){
 console.log(date);
}
main();