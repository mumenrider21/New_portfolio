//画像の設定

var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
    if (windowwidth > 768){
      var responsiveImage = [//PC用の画像
        { src: 'https://m.media-amazon.com/images/I/71c0+fcDMWL.jpg'},
        { src: 'https://jfv.jp/wp-content/uploads/2022/05/paaaaa_background.gif'},
        { src: 'https://steamuserimages-a.akamaihd.net/ugc/937194633965961867/EF7D9713618CF86471801A4E8B24527FEDD799B7/?imw=1024&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'},
        { src: 'https://cdn.piapro.jp/thumb_i/vo/vohbs9lre4q5dc39_20200702111327_0740_0500.gif'}

      ];
    } else {
      var responsiveImage = [//タブレットサイズ（768px）以下用の画像
        { src: 'https://i.ytimg.com/vi/2e9BwQDbJQI/maxresdefault.jpg' },
        { src: 'https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/6-1-3/img/img_sp_02.jpg' },
        { src: 'https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/6-1-3/img/img_sp_03.jpg' }
      ];
    }

//Vegas全体の設定

$('#slider').vegas({
    overlay: true,//画像の上に網線やドットのオーバーレイパターン画像を指定。
    transition: 'blur',//切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
    transitionDuration: 1000,//切り替わりのアニメーション時間をミリ秒単位で設定
    delay: 10000,//スライド間の遅延をミリ秒単位で。
    animationDuration: 20000,//スライドアニメーション時間をミリ秒単位で設定
    animation: 'kenburns',//スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
    slides: responsiveImage,//画像設定を読む
  });

  var slider;
var sliderFlag = false;
var breakpoint = 768;//768px以下の場合
  
function sliderSet() {
        var windowWidth = window.innerWidth;
        if (windowWidth >= breakpoint && !sliderFlag) {//768px以上は1行でスライダー表示
            slider = $('.slider').bxSlider({
            touchEnabled:false,//リンクを有効にするためスライドをマウスでドラッグした際にスライドの切り替えを可能にする機能を無効化
      mode: 'vertical',//縦スライド指定
      controls: false,//前後のコントロールを表示させない。
      auto: 'true',//自動的にスライド
      pager: false//ページ送り無効化
    });
            sliderFlag = true;
        } else if (windowWidth < breakpoint && sliderFlag) {
            slider.destroySlider();//bxSliderのOptionであるdestroySliderを使用してスライダーの動きを除去
            sliderFlag = false;
        }
    }

$(window).on('load resize', function() {
        sliderSet();
});



$(window).on('load',function(){ //画面遷移時にギャラリーの画像が被らないように、すべての読み込みが終わった後に実行する

  //＝＝＝Muuriギャラリープラグイン設定
  var grid = new Muuri('.grid', {
  
  //アイテムの表示速度※オプション。入れなくても動作します
  showDuration: 600,
  showEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  hideDuration: 600,
  hideEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    
  // アイテムの表示/非表示状態のスタイル※オプション。入れなくても動作します
    visibleStyles: {
      opacity: '1',
      transform: 'scale(1)'
    },
    hiddenStyles: {
      opacity: '0',
      transform: 'scale(0.5)'
    }    
  });
  
  //＝＝＝並び替えボタン設定
  $('.sort-btn li').on('click',function(){      //並び替えボタンをクリックしたら
    $(".sort-btn .active").removeClass("active"); //並び替えボタンに付与されているactiveクラスを全て取り除き
    var className = $(this).attr("class");      //クラス名を取得
    className = className.split(' ');       //「sortXX active」のクラス名を分割して配列にする
    $("."+className[0]).addClass("active");     //並び替えボタンに付与されているクラス名とギャラリー内のリストのクラス名が同じボタンにactiveクラスを付与
    if(className[0] == "sort00"){           //クラス名がsort00（全て）のボタンの場合は、
       grid.show('');               //全ての要素を出す
    }else{                      //それ以外の場合は
      grid.filter("."+className[0]);        //フィルターを実行
    }
  });
  
  //＝＝＝ Fancyboxの設定
  $('[data-fancybox]').fancybox({
   thumbs: {
      autoStart: true, //グループのサムネイル一覧をデフォルトで出す。不必要であればfalseに
    },  
  });
    
  });