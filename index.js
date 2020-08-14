var Jsoup = org.jsoup.Jsoup;

function getToken(ID, PW) {
  var result = Jsoup.connect("https://discord.com/api/v8/auth/login")
  .header("Content-Type", "application/json")
  .requestBody(JSON.stringify({"email":ID,"password":PW,"undelete":false,"captcha_key":null,"login_source":null,"gift_code_sku_id":null}))
  .ignoreContentType(true)
  .post()
  .text();

  var token = JSON.parse(result).token;

  return token;
}

function getLastMessage(token) {
  var result = Jsoup.connect("https://discord.com/api/v8/channels/585053214651580416/messages")
  .header("Content-Type", "application/json")
  .header("Authorization", token)
  .ignoreContentType(true)
  .get()
  .text();

  var lastmessage = JSON.parse(result)[0].content;

  return lastmessage
}

function sendMessage(token, TEXT) {
  var result = Jsoup.connect("https://discord.com/api/v8/channels/585053214651580416/messages")
  .header("Content-Type", "application/json")
  .header("Authorization", token)
  .requestBody(JSON.stringify({"content":TEXT,"nonce":0,"tts":false}))
  .ignoreContentType(true)
  .post()
  .text();

  return result;
}

function createThread(ID, PW) {
  var token = getToken(ID, PW);

  if (token != undefined) {
    for (;;) {
      if (getLastMessage(token) == "/엄준식") {
        sendMessage(token, "그게 사람이름임 ㅋㅋㅋ?");
      }
    }
  }
}

createThread("id", "pw");
