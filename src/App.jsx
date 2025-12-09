import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Utensils, ShoppingBag, Car, Navigation, 
  CloudSnow, CloudSun, Hotel, Phone, Trash2, AlertTriangle, Info, CreditCard, Wallet,
  ExternalLink, Search, CheckSquare, ShieldCheck, FileWarning, Plus, X
} from 'lucide-react';

// --- 1. 行程資料 ---
const itineraryData = [
  {
    day: 1,
    date: "1/17 (六)",
    title: "抵達與裝備",
    location: "東京 ➔ 輕井澤 ➔ 長野",
    weather: { temp: "-2°C", condition: "cloudy" },
    activities: [
      {
        id: "1-1", time: "10:30", type: "transport", title: "抵達東京 & 移動",
        desc: "成田/羽田機場前往東京站，轉乘新幹線至輕井澤。",
        tips: ["建議在機場或東京站先買點飯糰，新幹線上吃。"]
      },
      {
        id: "1-2", time: "13:00", type: "shopping", title: "輕井澤 Prince Shopping Plaza",
        location: "Karuizawa Prince Shopping Plaza",
        desc: "購買本次旅行最重要的裝備：防滑雪靴、雪衣。",
        highlight: "必買：The North Face, Columbia 雪靴",
        tips: ["行李可寄放車站 Coin Locker。", "務必買防水防滑的鞋子，不然去戶隱會很慘。"]
      },
      {
        id: "1-3", time: "18:00", type: "transport", title: "前往長野市", location: "JR Nagano Station",
        desc: "搭乘新幹線前往長野站 (約 30 分鐘)。",
      },
      {
        id: "1-4", time: "19:00", type: "food", title: "長野站前晚餐", location: "Nagano Station Midori",
        desc: "車站樓上 Midori 美食街或站前居酒屋。",
        highlight: "推薦：明治亭 醬汁豬排丼",
      }
    ]
  },
  {
    day: 2,
    date: "1/18 (日)",
    title: "神話與白雪",
    location: "長野 ➔ 戶隱 ➔ 白馬",
    weather: { temp: "-5°C", condition: "snow" },
    alert: "今日取車！請檢查 4WD 與雪胎。",
    activities: [
      {
        id: "2-1", time: "10:00", type: "transport", title: "租車取車", location: "Nippon Rent-a-car Nagano Station East Exit",
        desc: "前往長野站東口店取車。務必確認 4WD。",
        highlight: "檢查：加油蓋位置、除雪刷",
      },
      {
        id: "2-2", time: "11:30", type: "sightseeing", title: "戶隱神社 (中社)", location: "Togakushi Shrine Chusha",
        desc: "參拜著名的能量景點。冬季奧社封路，參拜中社即可。",
        tips: ["參道雪很厚，小心地滑。", "巨大的三本杉必拍。"]
      },
      {
        id: "2-3", time: "13:00", type: "food", title: "戶隱蕎麥麵", location: "Uzuraya Togakushi",
        desc: "日本三大蕎麥麵之一。",
        highlight: "必吃：うずら家 (Uzura-ya)",
        tips: ["排隊名店，建議一到就先去寫候位單。"]
      },
      {
        id: "2-4", time: "15:30", type: "sightseeing", title: "白馬村 Snow Peak", location: "Snow Peak Land Station Hakuba",
        desc: "由隈研吾設計的複合設施，喝咖啡欣賞北阿爾卑斯山雪景。",
        highlight: "必點：雪峰拿鐵",
      },
      {
        id: "2-5", time: "18:00", type: "relaxation", title: "白馬溫泉", location: "Hakuba Happo Onsen",
        desc: "著名的強鹼性溫泉，號稱美人之湯。",
        highlight: "推薦：八方之湯",
      }
    ]
  },
  {
    day: 3,
    date: "1/19 (一)",
    title: "國寶與冰湖",
    location: "長野 ➔ 松本 ➔ 諏訪",
    weather: { temp: "0°C", condition: "cloudy" },
    activities: [
      {
        id: "3-1", time: "10:00", type: "sightseeing", title: "松本城", location: "Matsumoto Castle",
        desc: "日本現存最古老的五重六階天守，雪中黑城非常美。",
        tips: ["天守閣樓梯非常陡，穿裙子不方便。"]
      },
      {
        id: "3-2", time: "12:00", type: "food", title: "午餐：山賊燒", location: "Nakamachi Street Matsumoto",
        desc: "中町通散步與午餐。",
        highlight: "必吃：松本名物 山賊燒",
      },
      {
        id: "3-3", time: "14:30", type: "sightseeing", title: "諏訪湖 & 諏訪大社", location: "Suwa Taisha Kamisha Honmiya",
        desc: "參拜諏訪大社，接著去立石公園看《你的名字》湖景。",
        highlight: "拍照點：立石公園",
      },
      {
        id: "3-4", time: "16:00", type: "transport", title: "移動回長野",
        desc: "若白樺湖路段積雪過深，建議改走高速公路回長野。",
        alert: "天黑前務必下山，高原路段易結冰"
      }
    ]
  },
  {
    day: 4,
    date: "1/20 (二)",
    title: "日本海鮮之都",
    location: "長野 ➔ 新潟",
    weather: { temp: "2°C", condition: "cloudy" },
    activities: [
      {
        id: "4-1", time: "10:00", type: "transport", title: "前往新潟", location: "Niigata Station",
        desc: "約 2-2.5 小時車程，沿途欣賞雪國風景。",
      },
      {
        id: "4-2", time: "13:00", type: "food", title: "Pier Bandai 海鮮市場", location: "Pier Bandai",
        desc: "新潟的廚房，海鮮選擇極多。",
        highlight: "必吃：迴轉壽司 弁慶",
        tips: ["弁慶非常熱門，建議避開尖峰或先抽號碼。"]
      },
      {
        id: "4-3", time: "15:30", type: "sightseeing", title: "Befco Bakauke 展望台", location: "Befco Bakauke Observation Deck",
        desc: "朱鷺展覽館 31F，免費入場，俯瞰信濃川與日本海。",
      }
    ]
  },
  {
    day: 5,
    date: "1/21 (三)",
    title: "越後酒藏與老街",
    location: "新潟 ➔ 長野",
    weather: { temp: "1°C", condition: "snow" },
    activities: [
      {
        id: "5-1", time: "10:00", type: "food", title: "Ponshukan (ぽんしゅ館)", location: "Ponshukan Niigata Station",
        desc: "位於新潟站內，500日圓試飲5種清酒。",
        highlight: "必試：爆彈飯糰",
        tips: ["未開車者可試飲，駕駛請喝甘酒。"]
      },
      {
        id: "5-2", time: "11:30", type: "sightseeing", title: "沼垂 Terrace 商店街", location: "Nuttari Terrace Street",
        desc: "舊工廠改建的文青街區，充滿咖啡廳與雜貨店。",
      },
      {
        id: "5-3", time: "14:00", type: "transport", title: "返回長野",
        desc: "自駕返回長野市。",
      }
    ]
  },
  {
    day: 6,
    date: "1/22 (四)",
    title: "雪猴與雪屋",
    location: "長野 ➔ 湯田中 ➔ 飯山",
    weather: { temp: "-3°C", condition: "snow" },
    activities: [
      {
        id: "6-1", time: "09:30", type: "sightseeing", title: "地獄谷野猿公苑", location: "Jigokudani Monkey Park",
        desc: "看世界唯一的雪猴泡溫泉。",
        tips: ["步道約 1.6km，非常滑，務必穿雪靴。", "禁止觸摸猴子或飲食。"]
      },
      {
        id: "6-2", time: "12:30", type: "food", title: "Enza Café", location: "Enza Cafe",
        desc: "步道入口處的溫暖咖啡廳。",
        highlight: "必吃：炸雞、熱蘋果派",
      },
      {
        id: "6-3", time: "15:00", type: "sightseeing", title: "飯山雪屋村", location: "Kamakura Village Iiyama",
        desc: "期間限定的雪屋祭典。",
        highlight: "體驗：雪屋火鍋 (需預約)",
        tips: ["若無預約，可在外部拍照並參觀神社。"]
      }
    ]
  },
  {
    day: 7,
    date: "1/23 (五)",
    title: "東京美食巡禮",
    location: "長野 ➔ 東京 ➔ 成田",
    weather: { temp: "8°C", condition: "sunny" },
    activities: [
      {
        id: "7-1", time: "10:00", type: "transport", title: "長野站還車",
        desc: "加滿油後還車，搭乘新幹線前往東京。",
      },
      {
        id: "7-2", time: "13:30", type: "food", title: "根室花まる (壽司)", location: "Nemuro Hanamaru Ginza",
        desc: "來自北海道的超人氣迴轉壽司。",
        highlight: "推薦：二層干貝、炙燒比目魚緣側",
        tips: ["推薦去銀座店 (Tokyu Plaza 10F)，比東京站丸之內店好排。"]
      },
      {
        id: "7-3", time: "15:00", type: "shopping", title: "銀座散策", location: "Ginza Six",
        desc: "享受東京的繁華午後。",
      },
      {
        id: "7-4", time: "19:00", type: "transport", title: "前往成田", location: "Narita Airport",
        desc: "晚上移動至成田機場周邊住宿，準備明日搭機。",
      }
    ]
  },
  {
    day: 8,
    date: "1/24 (六)",
    title: "返程",
    location: "成田 ➔ 機場",
    weather: { temp: "9°C", condition: "cloudy" },
    activities: [
      {
        id: "8-1", time: "--:--", type: "transport", title: "前往機場",
        desc: "搭乘飯店接駁車或步行前往成田機場。",
        alert: "請預留 3 小時辦理登機"
      }
    ]
  }
];

// --- 2. 預設準備清單資料 ---
const defaultPrepItems = [
  { id: 'p1', text: '護照 (檢查效期)', checked: false, type: 'prep' },
  { id: 'p2', text: '台灣駕照正本', checked: false, type: 'prep' },
  { id: 'p3', text: '駕照日文譯本', checked: false, type: 'prep' },
  { id: 'p4', text: '實體信用卡 (末碼3066)', checked: false, type: 'prep' },
  { id: 'p5', text: 'VJW 入境審查填寫', checked: false, type: 'prep' },
  { id: 'p6', text: '保暖：發熱衣褲/毛帽/手套', checked: false, type: 'prep' },
  { id: 'p7', text: '墨鏡 (雪地防眩光)', checked: false, type: 'prep' },
  { id: 'p8', text: '行動電源 & 充電線', checked: false, type: 'prep' },
  { id: 'b1', text: 'The North Face 雪靴', checked: false, type: 'buy' },
  { id: 'b2', text: 'Columbia 防水外套', checked: false, type: 'buy' },
];

// --- 3. 元件 ---

const WeatherIcon = ({ condition }) => {
  if (condition === 'snow') return <CloudSnow className="w-5 h-5 text-indigo-400" />;
  if (condition === 'sunny') return <CloudSun className="w-5 h-5 text-orange-400" />;
  return <CloudSnow className="w-5 h-5 text-gray-400" />;
};

// --- 行程頁面 ---
const ItineraryView = () => {
  const [activeDay, setActiveDay] = useState(1);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeDay]);
  const currentDayData = itineraryData.find(d => d.day === activeDay);

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto">
      <div className="flex overflow-x-auto gap-3 pb-4 mb-2 no-scrollbar snap-x">
        {itineraryData.map((d) => (
          <button key={d.day} onClick={() => setActiveDay(d.day)}
            className={`flex-shrink-0 snap-center flex flex-col items-center justify-center w-16 h-20 rounded-xl transition-all border ${activeDay === d.day ? "bg-stone-800 text-white border-stone-800 shadow-md transform scale-105" : "bg-white text-stone-400 border-stone-200"}`}>
            <span className="text-xs font-bold">{d.date.split(" ")[0]}</span>
            <span className="text-lg font-serif font-bold">D{d.day}</span>
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-1">{currentDayData.title}</h2>
            <div className="flex items-center text-stone-500 text-sm"><MapPin className="w-3 h-3 mr-1" />{currentDayData.location}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center bg-indigo-50 px-2 py-1 rounded-lg text-indigo-700">
              <WeatherIcon condition={currentDayData.weather.condition} /><span className="ml-1 text-sm font-bold">{currentDayData.weather.temp}</span>
            </div>
          </div>
        </div>
        {currentDayData.alert && (
          <div className="mt-3 flex items-start bg-red-50 p-3 rounded-lg border border-red-100">
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" /><p className="text-xs text-red-700 font-medium">{currentDayData.alert}</p>
          </div>
        )}
      </div>
      <div className="space-y-6 relative">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-stone-200 z-0"></div>
        {currentDayData.activities.map((activity) => (
          <div key={activity.id} className="relative z-10 pl-10">
            <div className={`absolute left-2 top-4 w-4 h-4 rounded-full border-2 border-white shadow-sm transform -translate-x-1/2 ${activity.type === 'food' ? 'bg-orange-400' : activity.type === 'transport' ? 'bg-blue-400' : activity.type === 'shopping' ? 'bg-pink-400' : 'bg-emerald-500'}`}></div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-stone-400 bg-stone-50 px-2 py-0.5 rounded-full border border-stone-100">{activity.time}</span>
                {activity.type === 'food' && <Utensils className="w-4 h-4 text-orange-400" />}
                {activity.type === 'transport' && <Car className="w-4 h-4 text-blue-400" />}
                {activity.type === 'shopping' && <ShoppingBag className="w-4 h-4 text-pink-400" />}
                {activity.type === 'sightseeing' && <Calendar className="w-4 h-4 text-emerald-400" />}
              </div>
              <h3 className="text-lg font-bold text-stone-800 mb-1">{activity.title}</h3>
              <p className="text-sm text-stone-600 mb-3 leading-relaxed">{activity.desc}</p>
              {activity.highlight && <div className="mb-3"><span className="bg-yellow-50 text-yellow-800 text-xs px-2 py-1 rounded border border-yellow-200 font-medium">★ {activity.highlight}</span></div>}
              {activity.tips && <ul className="mb-4 space-y-1">{activity.tips.map((tip, i) => <li key={i} className="text-xs text-stone-500 flex items-start"><span className="mr-1.5">•</span> {tip}</li>)}</ul>}
              {activity.location && (
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center bg-stone-800 text-white py-2 rounded-lg text-sm font-medium active:bg-stone-900 transition-colors">
                  <Navigation className="w-4 h-4 mr-2" />導航前往
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 資訊頁面 (含詳細租車資訊) ---
const InfoView = () => (
  <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
    <h2 className="text-2xl font-bold text-stone-800 px-1">旅程資訊</h2>
    
    {/* 租車詳細資訊區塊 (新增重點) */}
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="bg-indigo-900 px-4 py-3 flex items-center justify-between text-white">
        <div className="flex items-center"><Car className="w-5 h-5 mr-2" /><h3 className="font-bold">Nippon 租車詳情</h3></div>
        <span className="text-xs bg-indigo-700 px-2 py-0.5 rounded">S-S Class</span>
      </div>
      
      <div className="p-4 space-y-5">
        {/* 車輛規格 */}
        <div>
           <h4 className="text-sm font-bold text-stone-800 mb-2 flex items-center"><Info className="w-4 h-4 mr-1 text-indigo-600"/> 車輛規格</h4>
           <ul className="text-sm text-stone-600 space-y-1 pl-1">
             <li className="flex justify-between border-b border-stone-50 pb-1"><span>車型</span><span className="font-medium">Fit / Yaris (同級)</span></li>
             <li className="flex justify-between border-b border-stone-50 pb-1"><span>驅動</span><span className="font-medium text-red-600 font-bold">4WD (需口頭確認)</span></li>
             <li className="flex justify-between border-b border-stone-50 pb-1"><span>輪胎</span><span className="font-medium">無釘雪胎 (已含)</span></li>
             <li className="flex justify-between"><span>禁煙</span><span className="font-medium">是</span></li>
           </ul>
        </div>

        {/* 取還車 */}
        <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-stone-400 mb-0.5">取車</div>
              <div className="font-bold text-indigo-900">1/18 10:00</div>
              <div className="text-xs text-stone-500">長野站東口</div>
            </div>
            <div>
              <div className="text-xs text-stone-400 mb-0.5">還車</div>
              <div className="font-bold text-indigo-900">1/23 10:00</div>
              <div className="text-xs text-stone-500">長野站東口</div>
            </div>
          </div>
          <a href="https://maps.app.goo.gl/w1S6hE5v4z5j3iZ98" target="_blank" rel="noreferrer" className="mt-3 w-full bg-white border border-indigo-200 text-indigo-700 py-1.5 rounded flex items-center justify-center text-xs font-medium">
             <Navigation className="w-3 h-3 mr-1" />導航至長野站東口店
          </a>
        </div>

        {/* 保險內容 */}
        <div>
           <h4 className="text-sm font-bold text-stone-800 mb-2 flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-green-600"/> 全套保險 (已含)</h4>
           <div className="text-xs text-stone-600 bg-green-50 p-3 rounded border border-green-100 space-y-1">
             <div className="flex items-center"><CheckSquare className="w-3 h-3 mr-2 text-green-600"/><span>免責補償 (CDW) - 免自負額</span></div>
             <div className="flex items-center"><CheckSquare className="w-3 h-3 mr-2 text-green-600"/><span>ECO (NOC補償) - 免營業損失</span></div>
             <div className="flex items-center"><CheckSquare className="w-3 h-3 mr-2 text-green-600"/><span>道路救援 (免費額度內)</span></div>
           </div>
        </div>

        {/* 取車必備文件 */}
        <div>
           <h4 className="text-sm font-bold text-stone-800 mb-2 flex items-center"><FileWarning className="w-4 h-4 mr-1 text-orange-600"/> 取車必備文件</h4>
           <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside bg-orange-50 p-3 rounded border border-orange-100">
             <li>台灣駕照 <span className="font-bold">正本</span></li>
             <li>駕照 <span className="font-bold">日文譯本</span></li>
             <li>護照</li>
             <li><span className="font-bold text-red-600">實體信用卡 (末碼 3066)</span></li>
           </ul>
        </div>

        {/* 注意事項 (紅區) */}
        <div className="bg-red-50 p-3 rounded border border-red-100 text-xs text-red-800 space-y-2">
           <strong className="block text-red-900 flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> 重要注意事項</strong>
           <p>1. <span className="font-bold">滿油還車 & 保留收據</span>：還車時店員會檢查加油收據。</p>
           <p>2. <span className="font-bold">遇事故必報警</span>：無論擦撞多小，一定要報警 (110) 才有保險理賠。</p>
           <p>3. <span className="font-bold">嚴禁違停</span>：罰金高達 2.5 萬日圓且手續麻煩。</p>
        </div>
      </div>
    </div>

    {/* 住宿區塊 */}
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="bg-stone-800 px-4 py-3 flex items-center text-white"><Hotel className="w-5 h-5 mr-2" /><h3 className="font-bold">住宿安排</h3></div>
      <div className="p-4 space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <div className="text-xs text-stone-400 mb-1">1/17 (1晚)</div>
          <div className="font-bold">Hotel JAL City Nagano</div>
          <div className="flex items-center mt-1 mb-2"><span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded mr-2">無早餐</span></div>
          <a href="https://www.agoda.com/zh-tw/search?text=Hotel%20JAL%20City%20Nagano" target="_blank" rel="noreferrer" className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800"><ExternalLink className="w-3 h-3 mr-1" />Agoda 查看</a>
        </div>
        <div className="border-b border-stone-100 pb-3">
          <div className="text-xs text-stone-400 mb-1">1/18-1/20 (2晚)</div>
          <div className="font-bold">Sotetsu Fresa Inn Nagano-Zenkojiguchi</div>
          <div className="flex items-center mt-1 mb-2"><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded mr-2">含早餐</span></div>
          <a href="https://www.agoda.com/zh-tw/search?text=Sotetsu%20Fresa%20Inn%20Nagano-Zenkojiguchi" target="_blank" rel="noreferrer" className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800"><ExternalLink className="w-3 h-3 mr-1" />Agoda 查看</a>
        </div>
        <div className="border-b border-stone-100 pb-3">
          <div className="text-xs text-stone-400 mb-1">1/20-1/21 (1晚)</div>
          <div className="font-bold">Hotel Nikko Niigata</div>
          <div className="flex items-center mt-1 mb-2"><span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded mr-2">無早餐</span></div>
           <a href="https://www.agoda.com/zh-tw/search?text=Hotel%20Nikko%20Niigata" target="_blank" rel="noreferrer" className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800"><ExternalLink className="w-3 h-3 mr-1" />Agoda 查看</a>
        </div>
        <div className="border-b border-stone-100 pb-3">
          <div className="text-xs text-stone-400 mb-1">1/21-1/23 (2晚)</div>
          <div className="font-bold">Sotetsu Fresa Inn Nagano-Zenkojiguchi</div>
          <div className="flex items-center mt-1 mb-2"><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded mr-2">含早餐</span></div>
          <a href="https://www.agoda.com/zh-tw/search?text=Sotetsu%20Fresa%20Inn%20Nagano-Zenkojiguchi" target="_blank" rel="noreferrer" className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800"><ExternalLink className="w-3 h-3 mr-1" />Agoda 查看</a>
        </div>
        <div>
          <div className="text-xs text-stone-400 mb-1">1/23-1/24 (1晚)</div>
          <div className="font-bold">Toyoko Inn Narita Airport Shinkan</div>
          <div className="flex items-center mt-1 mb-2"><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded mr-2">含早餐</span></div>
          <a href="https://www.agoda.com/zh-tw/search?text=Toyoko%20Inn%20Narita%20Airport%20Shinkan" target="_blank" rel="noreferrer" className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800"><ExternalLink className="w-3 h-3 mr-1" />Agoda 查看</a>
        </div>
      </div>
    </div>

    {/* 緊急聯絡 */}
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="bg-red-700 px-4 py-3 flex items-center text-white"><Phone className="w-5 h-5 mr-2" /><h3 className="font-bold">緊急聯絡</h3></div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <a href="tel:110" className="flex flex-col items-center p-3 bg-stone-50 rounded-lg"><span className="text-xl font-bold">110</span><span className="text-xs text-stone-500">警察局</span></a>
        <a href="tel:119" className="flex flex-col items-center p-3 bg-stone-50 rounded-lg"><span className="text-xl font-bold">119</span><span className="text-xs text-stone-500">救護/消防</span></a>
      </div>
    </div>
  </div>
);

// --- 全新清單頁面 (Checklist) ---
const ChecklistView = () => {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [activeType, setActiveType] = useState('prep'); // 'prep' or 'buy'

  // Load
  useEffect(() => {
    const saved = localStorage.getItem('trip_checklist');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(defaultPrepItems);
    }
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem('trip_checklist', JSON.stringify(items));
  }, [items]);

  const toggleCheck = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setItems([...items, { id: Date.now().toString(), text: newItemText, checked: false, type: activeType }]);
    setNewItemText('');
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const displayItems = items.filter(i => i.type === activeType);

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-stone-800 mb-6 px-1">準備與購物</h2>

      {/* Tabs */}
      <div className="flex bg-stone-200 p-1 rounded-xl mb-6">
        <button 
          onClick={() => setActiveType('prep')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeType === 'prep' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}
        >
          行前準備
        </button>
        <button 
          onClick={() => setActiveType('buy')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeType === 'buy' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}
        >
          購物清單
        </button>
      </div>

      {/* Input */}
      <form onSubmit={addItem} className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder={activeType === 'prep' ? "新增準備項目..." : "新增想買的東西..."}
          className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-stone-400 shadow-sm"
        />
        <button type="submit" className="bg-stone-800 text-white w-12 rounded-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform">
          <Plus size={20} />
        </button>
      </form>

      {/* List */}
      <div className="space-y-3">
        {displayItems.length === 0 && <div className="text-center text-stone-400 py-8 text-sm">清單是空的</div>}
        {displayItems.map(item => (
          <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${item.checked ? 'bg-stone-50 border-stone-100 opacity-60' : 'bg-white border-stone-100 shadow-sm'}`}>
            <div className="flex items-center flex-1 cursor-pointer" onClick={() => toggleCheck(item.id)}>
              <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${item.checked ? 'bg-indigo-500 border-indigo-500' : 'border-stone-300'}`}>
                {item.checked && <CheckSquare size={14} className="text-white" />}
              </div>
              <span className={`text-sm font-medium ${item.checked ? 'text-stone-400 line-through' : 'text-stone-700'}`}>{item.text}</span>
            </div>
            <button onClick={() => deleteItem(item.id)} className="text-stone-300 hover:text-red-400 p-2">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 記帳頁面 ---
const BudgetView = () => {
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');

  useEffect(() => { const saved = localStorage.getItem('trip_budget'); if (saved) setItems(JSON.parse(saved)); }, []);
  useEffect(() => { localStorage.setItem('trip_budget', JSON.stringify(items)); }, [items]);

  const handleAdd = (e) => {
    e.preventDefault(); if (!desc || !amount) return;
    setItems([{ id: Date.now(), desc, amount: parseInt(amount), category, date: new Date().toLocaleDateString() }, ...items]);
    setDesc(''); setAmount('');
  };
  
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-stone-800 mb-6 px-1">旅費記帳</h2>
      <div className="bg-gradient-to-br from-stone-800 to-stone-700 rounded-2xl p-6 text-white shadow-lg mb-8">
        <div className="text-stone-300 text-sm mb-1">總支出 (JPY)</div>
        <div className="text-4xl font-bold font-mono tracking-tight">{total.toLocaleString()}</div>
      </div>
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-8">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {['food', 'transport', 'shopping', 'other'].map(cat => (
            <button key={cat} type="button" onClick={() => setCategory(cat)} className={`p-2 rounded-lg flex justify-center ${category === cat ? 'bg-indigo-100 text-indigo-600' : 'bg-stone-50 text-stone-400'}`}>
              {cat === 'food' && <Utensils size={20} />}{cat === 'transport' && <Car size={20} />}{cat === 'shopping' && <ShoppingBag size={20} />}{cat === 'other' && <Wallet size={20} />}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          <input type="text" placeholder="項目" className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <input type="number" placeholder="金額" className="w-24 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-stone-800 text-white py-2 rounded-lg text-sm font-bold">加入記帳</button>
      </form>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center mr-3 text-stone-500">
                {item.category === 'food' && <Utensils size={14} />}{item.category === 'transport' && <Car size={14} />}{item.category === 'shopping' && <ShoppingBag size={14} />}{item.category === 'other' && <Wallet size={14} />}
              </div>
              <div><div className="font-medium text-sm">{item.desc}</div><div className="text-stone-400 text-xs">{item.date}</div></div>
            </div>
            <div className="flex items-center"><span className="font-mono font-bold text-stone-700 mr-3">{item.amount.toLocaleString()}</span><button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="text-stone-300 hover:text-red-400"><Trash2 size={16} /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('itinerary');
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-indigo-100">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-stone-100 px-4 h-14 flex items-center justify-center shadow-sm">
        <h1 className="font-serif font-bold text-lg tracking-wider text-stone-800">長野・雪國旅記</h1>
      </header>
      <main className="pt-14 min-h-screen">
        {activeTab === 'itinerary' && <ItineraryView />}
        {activeTab === 'info' && <InfoView />}
        {activeTab === 'checklist' && <ChecklistView />}
        {activeTab === 'budget' && <BudgetView />}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 pb-safe z-50 safe-area-pb">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'itinerary' ? 'text-stone-900' : 'text-stone-400'}`}><Calendar className="w-6 h-6" /><span className="text-[10px] font-medium">行程</span></button>
          <button onClick={() => setActiveTab('info')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'info' ? 'text-stone-900' : 'text-stone-400'}`}><Info className="w-6 h-6" /><span className="text-[10px] font-medium">資訊</span></button>
          <button onClick={() => setActiveTab('checklist')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'checklist' ? 'text-stone-900' : 'text-stone-400'}`}><CheckSquare className="w-6 h-6" /><span className="text-[10px] font-medium">清單</span></button>
          <button onClick={() => setActiveTab('budget')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'budget' ? 'text-stone-900' : 'text-stone-400'}`}><CreditCard className="w-6 h-6" /><span className="text-[10px] font-medium">記帳</span></button>
        </div>
      </nav>
      <style>{` .pb-safe { padding-bottom: env(safe-area-inset-bottom); } `}</style>
    </div>
  );
};

export default App;


