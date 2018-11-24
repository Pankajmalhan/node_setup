const {server,socket} =require('../util/imports');

/*Chart Data */
var lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
var lineChartType = 'line';
var lineChartType2 = 'doughnut';
var pieChartType = 'pie';
var pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
var pieChartData = [300, 500, 100];
/*Chart Data */


/*Setup Socket.io  */
const io = socket(server);
io.on('connection', (socket) => {
    console.log("Connected to Socket!!" + socket.id);
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
/*Setup Socket.io */
module.exports=io;