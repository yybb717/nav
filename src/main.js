const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");

const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B",url: "https://www.bilibili.com"},
  {
    logo: "T",
    url: "https://www.taobao.com"
  }
];

const removeX = url => {
  return url
    .replace("https://www.", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, '');
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    console.log(index)
    const $li = $(`<li>
        <div class="site">
          <div class="logo">${removeX(node.url)[0].toUpperCase()}</div>
          <div class="link">${removeX(node.url)}</div>
           <div class="close"> <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg></div>
        </div>
    </li>`).insertBefore($lastLi)
    $li.on('click', () => { window.open(node.url) })
    $li.on('click', '.close', (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({ logo:removeX(url)[0].toUpperCase(), url: url });

  render();
});

window.onbeforeunload = () => {
  console.log("页面要关闭了");

  const string = JSON.stringify(hashMap);

  window.localStorage.setItem("x", string);
};

$(document).on('keypress', (e) => {
   //按下键盘a，打印出一个对象，有个属性是keyCode: 97和属性key是a的Unicode字符编码
  const {key} = e //const key = e.key
  console.log(key)
  for (let i = 0; i < hashMap.length;i++){
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})

