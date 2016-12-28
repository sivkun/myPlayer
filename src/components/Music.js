class Music{
  constructor(item){
    this.artist=item.artist;
    this.song=item.song;
    this.url=item.url;
    this.totalTime=item.totalTime;
    this.curTime=item.curTime;
    this.status=item.status;
    this.dragTime=item.dragTime;
  }
  setCurTime(time){
    this.curTime=time;
    return this;
  }
  setStatus(status){
    this.status=status;
    return this;
  }
  setDragTime(time){
    this.dragTime=time;
    return this;
  }
}
/*
 let playList=[{artist:'许巍', song:'世外桃源', totalTime:287.5,curTime:0,url:'../resource/许巍 - 世外桃源.mp3',status:'pause',dragTime:-1},
              {artist:'刘若英', song:'后来', totalTime:351,curTime:0,url:'../resource/刘若英 - 后来 (Live).mp3',status:'pause',dragTime:-1},
              {artist:'高瑞', song:'魔术先生', totalTime:184,curTime:0,url:'../resource/高瑞 - 魔术先生.mp3',status:'pause',dragTime:-1},
              {artist:'MONO', song:'Ashes In The Snow', totalTime:706,curTime:0,url:'../resource/MONO - Ashes In The Snow.mp3',status:'pause',dragTime:-1},
              {artist:'李宗盛', song:'漂洋过海来看你', totalTime:267,curTime:0,url:'../resource/李宗盛 - 飘扬过海来看你.mp3',status:'pause',dragTime:-1},
              {artist:'张信哲', song:'信仰', totalTime:255,curTime:0,url:'../resource/张信哲 - 信仰.mp3',status:'pause',dragTime:-1},
              {artist:'沈腾', song:'一次就好', totalTime:208,curTime:0,url:'../resource/沈腾 - 一次就好.mp3',status:'pause',dragTime:-1},
              {artist:'刘千楚', song:'北京东路的日子', totalTime:280,curTime:0,url:'../resource/刘千楚 - 北京东路的日子.mp3',status:'pause',dragTime:-1},
              {artist:'薛之谦', song:'一半', totalTime:286,curTime:0,url:'../resource/薛之谦 - 一半.mp3',status:'pause',dragTime:-1},
              {artist:'桃子鱼仔的Ukulele教室', song:'小幸运', totalTime:257,curTime:0,url:'../resource/桃子鱼仔的Ukulele教室 - 小幸运.mp3',status:'pause',dragTime:-1},
              {artist:'陈鸿宇', song:'理想三旬', totalTime:220,curTime:0,url:'../resource/陈鸿宇 - 理想三旬.mp3',status:'pause',dragTime:-1},
              {artist:'李荣浩', song:'模特', totalTime:306,curTime:0,url:'../resource/李荣浩 - 模特.mp3',status:'pause',dragTime:-1}
          ];
*/
 let playList=[{artist:'宋冬野', song:'斑马，斑马', totalTime:250,curTime:0,url:'http://m2.music.126.net/W8mcwcONibEgo4BIuLw0lw==/3295236355160055.mp3',status:'pause',dragTime:-1},
              {artist:'许巍', song:'世外桃源', totalTime:287.5,curTime:0,url:'http://m2.music.126.net/QzFazqPmV6b95VyLjs0gpQ==/1306219813817386.mp3',status:'pause',dragTime:-1},
              {artist:'刘若英', song:'后来', totalTime:351,curTime:0,url:'http://m2.music.126.net/0ivWJBPfJL7YKV-BrYG7Sg==/6634453162708212.mp3',status:'pause',dragTime:-1},
              {artist:'高瑞', song:'魔术先生', totalTime:184,curTime:0,url:'http://m2.music.126.net/ErP26ZtsqGZedv5x0-eOtw==/2946691234255706.mp3',status:'pause',dragTime:-1},
              {artist:'MONO', song:'Ashes In The Snow', totalTime:706,curTime:0,url:'http://music.163.com/#/song?id=776668&userid=95732993',status:'pause',dragTime:-1},
              {artist:'周深', song:'漂洋过海来看你', totalTime:183,curTime:0,url:'http://m2.music.126.net/Yev_vdcos-1_SX2qC9WUfw==/7856010580878729.mp3',status:'pause',dragTime:-1},
              {artist:'张信哲', song:'信仰', totalTime:255,curTime:0,url:'http://m2.music.126.net/01-CRaSs6J285om_CH_r8A==/1364493979857069.mp3',status:'pause',dragTime:-1},
              {artist:'沈腾', song:'一次就好', totalTime:208,curTime:0,url:'http://m2.music.126.net/lBJYPYWLfiyWCT0d_0nbEg==/3287539768464014.mp3',status:'pause',dragTime:-1},
              {artist:'刘千楚', song:'北京东路的日子', totalTime:280,curTime:0,url:'http://m2.music.126.net/NEUvX_eElbXR_tKwxexizw==/5838406743610975.mp3',status:'pause',dragTime:-1},
              {artist:'薛之谦', song:'一半', totalTime:286,curTime:0,url:'http://m2.music.126.net/K1D1BRy27_DqsG2ZKztggw==/3380998256726946.mp3',status:'pause',dragTime:-1},
              {artist:'桃子鱼仔的Ukulele教室', song:'小幸运', totalTime:257,curTime:0,url:'http://m2.music.126.net/LE9Chuy-W-SjH5sBS1986g==/528865126354886.mp3',status:'pause',dragTime:-1},
              {artist:'陈鸿宇', song:'理想三旬', totalTime:210,curTime:0,url:'http://m2.music.126.net/3KW-PmVF820wUth302USRA==/18817041997835251.mp3',status:'pause',dragTime:-1},
              {artist:'李荣浩', song:'模特', totalTime:273,curTime:0,url:'http://m2.music.126.net/PEata2lWFbU8G74L6Ibqcg==/3354609976353452.mp3',status:'pause',dragTime:-1}
          ];

export {Music,playList};
