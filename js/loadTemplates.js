var tmpl = {
  'base': 'template/base.tmpl',
  'login': 'template/login.tmpl',
  'home': 'template/home.tmpl',
  'board': 'template/board.tmpl',
  'post': 'template/post.tmpl',
  'dopost': 'template/dopost.tmpl',
}
$.ajaxSetup({async:false});
_.each(tmpl,function(url,id){
  $.get(url,function(data){
    tmpl[id] = _.template(data);
  });
});
$.ajaxSetup({async:true});

$("body")
  .append('<div id="page_login" data-role="page">')
  .append('<div id="page_home" data-role="page">')
  .append('<div id="page_board" data-role="page">');
//login
var content = {
  hasPannel:false,
  pageid:"page_login",
  header:"登陆-南洋客栈信",
  content:tmpl.login(),
  footer:"<h1>南洋客栈信</h1>",
};
$("#" + content.pageid).replaceWith(tmpl.base(content));

//home
function renderHome(drupaluser){
  console.log(drupaluser);
  var content = {
    hasPannel:true,
    pageid:"page_home",
    header:"主页-南洋客栈信",
    content:tmpl.home({drupaluser:drupaluser}),
    footer:"<h1>南洋客栈信</h1>",
  };
  return tmpl.base(content);
}

function renderBoard(board){
  var pageid = "page_" + new Date().getTime();
  board.returnpageid = pageid;
  var content = {
    hasPannel:true,
    pageid:pageid,
    header:board.board + " 板",
    content:tmpl.board(board),
    footer:'<a href="#" data-icon="plus" onclick="doPost(\'' + board.board + '\',\'' + pageid + '\')">发表文章</a>\
    <a href="#" data-icon="arrow-u" onclick="gotoBoard(\'' + board.board + '\',' + (board.start-20) +')">上一页</a>\
    <a href="#" data-icon="arrow-d" onclick="gotoBoard(\'' + board.board + '\',' + (board.start+20) +')">下一页</a>',
  };
  return tmpl.base(content);
}

function renderPost(post,returnpageid){
  var content = {
    hasPannel:true,
    pageid:"page_" + new Date().getTime(),
    header:'<a href="#" data-icon="back" onclick="pageStack.pop(false)">返回</a><h1>' + post.boardName + "板</h1>",
    content:"<pre style='word-wrap: break-word;'>" + post.post + "</pre>",
    footer:post.filename + " @ " + post.boardName,
    returnpage:returnpageid
  };
  return tmpl.post(content);
}

function renderCreatePost(boardName,returnpageid){
  var content = {
    hasPannel:false,
    pageid:"page_" + new Date().getTime(),
    header:'<a href="#" data-icon="back" onclick="pageStack.pop(false)">返回</a><h1>在' + boardName + '板发表文章</h1>',
    boardName:boardName,
    footer:"<h1>南洋客栈信！</h1>",
    returnpage:returnpageid,
  }
  return tmpl.dopost(content);
};
