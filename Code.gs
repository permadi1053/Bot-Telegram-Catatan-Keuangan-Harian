var token = "BOT API"; // ambil token dari botFather telegram
var SSID = "SSID spredsheet"; // ambil ID pada URL database spreadsheets
var webAppUrl = "https://script.google.com/macros/s/A............../exec"; // ambil url hasil publish
//var SSID = "SSID spredsheet"; //alamat spreadsheet untuk simpan
var namasheet = "Database"; //alamat sheet pada spreadsheet
var url = "https://api.telegram.org/bot" + token;

function setWebhook() {
    var response = UrlFetchApp.fetch(url + "/setWebhook?url=" + webAppUrl);
    Logger.log(response.getContentText());
  }

function doPost(e) {
    var stringJson = e.postData.getDataAsString();
    var updates = JSON.parse(stringJson);
    //log(updates);
    var id = updates.message.from.id;
    var nama = updates.message.from.first_name;
    var username = updates.message.from.username;
    var textBot = updates.message.text;
    var chat_bot = textBot;
    var command_cek = chat_bot.substring(0, 1);
    var command = chat_bot.split(",")[0]; // command
    var subCommand = chat_bot.split(",")[1]; // odp
  
  
    switch(command){
      case "/start" :
        let start =
            '👋 Selamat datang di Permadi_Bot ' +
            '<b> Pencatatan Keuangan Sederhana</b>\n\n' +
              'Silahkan input command dibawah ini:✔ \n 🔶 /save, [description],[pemasukan],[pengeluaran] untuk input data. \n 🔶 /view untuk melihat semua mutasi transaksi data. \n 🔶 /rekap untuk melihat total rekap summary. \n 🔶 /help untuk melihat List command bot.'
            ;
        sendText(id, start);
        break;
      case "/help" :
        let text2 = "👾 LIST COMMAND BOT ✅ : \n 🔶 /save, [description],[pemasukan],[pengeluaran] untuk input data. \n 🔶 /view untuk melihat semua mutasi transaksi data. \n 🔶 /rekap untuk melihat total rekap summary.";
        sendText(id, text2);
        
        break;
      case "/save" :
        simpan(updates);
        break;
      case "/view" :
        sendText(id, searchAllData());
      break;
      case "/rekap" :
        sendText(id, getSummary());
      break;
      default:
        sendText(id,"❌ Command tidak ditemukan ⛔ !! ");   
    }
  
}

function simpan(data) {
    let id = data.message.from.id;
    var nama = data.message.from.first_name;
    var username = data.message.from.username;
    var pesan = data.message.text;
    let text = pesan;
    var now = new Date();
    var waktu = Utilities.formatDate(now, "Asia/Jakarta", "dd/MM/yyyy hh:mm:ss"); // format timestamp indonesia
    var number = 1;

    var txt1 = text.split(",")[0]; // kata pertama/command
    var txt2 = text.split(",")[1]; // kata kedua
    var txt3 = text.split(",")[2]; // kata ketiga
    var txt4 = text.split(",")[3]; // kata keempat

    
    SpreadsheetApp.openById(SSID).getSheetByName(namasheet).appendRow([waktu, txt2, txt3, txt4]); // input log
    sendText(id, "💾 Data Berhasil disimpan ! ✅");
}

function sendText(chatid, text, replymarkup) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatid),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(replymarkup)
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function getData() {
  var rangeName = 'Database!A5:D'; //nama sheet dari spreadsheet
  var rows = Sheets.Spreadsheets.Values.get(SSID, rangeName).values;
  return rows;
}

function searchByDate()  {
  var dataReport = getData();
  var no = 1;
  var num = 1;
  const data = [];
 
  var header = '<b>Data Mutasi Laporan Keuangan ✔</b>';
   
    var th = '\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ \n' +
    '<b>No. |Tanggal|Deskripsi|Pemasukan|Pengeluaran</b> \n' +
    '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n';
 
  for (var row = 0; row < dataReport.length; row++) {
   
      var print = num++ + '.  ' + dataReport[row][0] + ' | ' + dataReport[row][1] + ' | ' + dataReport[row][2] + ' | <b>' + dataReport[row][3] +'</b>\n\n';
      data.push(print);     
             
  }
 
  var gabung1 = header + th + data;   
  var clearKoma1 = gabung1.toString();   
  //var dataBaru1 = clearKoma1.replaceAll(',', '');       
  var dataBaru1 = clearKoma1;
  return dataBaru1;
}


function searchAllData() {
  var dataReport = getData();
  var no = 1;
  var num = 1;
  const data = [];
 
  var header = '<b>📊📄  Data Mutasi Laporan Keuangan  ✔</b>';
   
    var th = '\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ \n' +
    '<b>|| No. || Tanggal || Deskripsi || Pemasukan || Pengeluaran ||</b> \n' +
    '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n';
 
  for (var row = 0; row < dataReport.length; row++) {
      var pemasukan = Utilities.formatString( 'Rp. %.2f', + dataReport[row][2]);
      var pengeluaran = Utilities.formatString( 'Rp. %.2f', + dataReport[row][3]);
      var print = ''+ num++ + '. ' + dataReport[row][0] + ' | ' + dataReport[row][1] + ' | ' + pemasukan + ' | <b>' + pengeluaran +'</b>\n\n';
      data.push(print);     
  }   
 
  var gabung1 = header + th + data;   
  var clearKoma1 = gabung1.toString();   
  var dataBaru1 = clearKoma1.replaceAll(',', '');       
  //var dataBaru1 = clearKoma1;
  return dataBaru1;
}

function getSummary() 
{
  var ValTotalPemasukan = Sheets.Spreadsheets.Values.get(SSID, 'Database!B2').values;
  var ValTotalPengeluaran = Sheets.Spreadsheets.Values.get(SSID, 'Database!B3').values;
  var ValTotalSaving = Sheets.Spreadsheets.Values.get(SSID, 'Database!D2:D3').values;
  var no = 1;
  var num = 1;
  const data = [];
  var header = '<b> 📊📄  Data Rekapitulasi Total Laporan Keuangan  ✔</b>';
  var th = '\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ \n' +
    '<b> 🔘 Total Pemasukan   :</b>'+ValTotalPemasukan +'\n' +
    '<b> 🔘 Total Pengeluaran :</b>'+ValTotalPengeluaran +'\n' +
    '<b> 🔘 Total Saving'+ '\t\t'+':</b>'+ValTotalSaving +'\n' +
          '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n';
  
  var gabung1 = header + th ; 
  var clearKoma1 = gabung1.toString();   
  //var dataBaru1 = clearKoma1.replaceAll(',', '');       
  var dataBaru1 = clearKoma1;
  return dataBaru1;  
}


