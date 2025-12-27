import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Utensils, ShoppingBag, Car, Navigation, 
  CloudSnow, CloudSun, Hotel, Phone, Trash2, AlertTriangle, Info, CreditCard, Wallet,
  ExternalLink, Search, CheckSquare, ShieldCheck, FileWarning, Plus, X, Plane, Ticket, Luggage, Train
} from 'lucide-react';

// --- 1. 行程資料 (根據車票時間更新) ---
const itineraryData = [
  {
    day: 1,
    date: "1/17 (六)",
    title: "抵達與移動",
    location: "成田 ➔ 東京 ➔ 輕井澤",
    weather: { temp: "-2°C", condition: "cloudy" },
    activities: [
      {
        id: "1-1", time: "06:30", type: "transport", title: "抵達東京成田 (NRT)",
        desc: "樂桃 MM620 抵達 T1 第一航廈。辦理入境、領取行李。",
        tips: ["入境後記得先去上廁所、買水。", "前往 B1 JR 車站改札口。"]
      },
      {
        id: "1-2", time: "08:12", type: "transport", title: "N'EX 成田特快 4號",
        desc: "成田 T1 發 (08:12) ➔ 東京站 著 (09:20)。",
        highlight: "座位：7車 10A, 10B",
        tips: ["使用「N'EX去回車票」進站。", "到東京站後，轉乘「北陸新幹線」。"]
      },
      {
        id: "1-3", time: "10:07", type: "transport", title: "新幹線 Hakutaka 559",
        desc: "東京站 發 (10:07) ➔ 輕井澤 著 (11:11)。",
        tips: ["轉乘時間約 45 分鐘，建議在東京站買「駅弁」車上吃。", "座位：請確認票面 (E48341)。"]
      },
      {
        id: "1-4", time: "11:30", type: "shopping", title: "輕井澤 Prince Shopping Plaza",
        location: "Karuizawa Prince Shopping Plaza",
        desc: "抵達輕井澤！先寄放行李（車站 Coin Locker 或王子飯店接駁車）。",
        highlight: "必買：The North Face, Columbia 雪靴",
        tips: ["Outlet 很大，建議先看地圖鎖定戶外用品區。", "午餐可在 Outlet 美食街解決。"]
      },
      {
        id: "1-5", time: "16:00", type: "transport", title: "前往長野市", location: "JR Nagano Station",
        desc: "搭乘新幹線前往長野站 (約 30 分鐘)。(尚未預訂)",
      },
      {
        id: "1-6", time: "18:00", type: "food", title: "長野站前晚餐", location: "Nagano Station Midori",
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
        desc: "晚上移動至成田機場周邊住宿，準備明日搭機 (長野回東京、N'EX回程座位尚未預約)。",
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
        id: "8-1", time: "08:30", type: "transport", title: "捷星 GK13 起飛",
        desc: "成田 T3 第三航廈出發。請務必提前 3 小時抵達機場。",
        alert: "08:30 起飛 - 11:50 抵達"
      }
    ]
  }
];

// --- 2. 預設資料 ---
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

// 更新固定支出 (加入實際車票金額)
const defaultFixedCosts = [
  { id: 'fc1', title: '租車 (Nippon Rent-A-Car)', amount: 39160, note: 'S-S Class + CDW/ECO', paid: true },
  { id: 'fc2', title: '去程機票 (Peach)', amount: 0, note: '請輸入金額', paid: true },
  { id: 'fc3', title: '回程機票 (Jetstar)', amount: 0, note: '請輸入金額', paid: true },
  { id: 'fc4', title: '住宿 (Hotel JAL City)', amount: 0, note: '1/17', paid: false },
  { id: 'fc5', title: '住宿 (Sotetsu Fresa)', amount: 0, note: '長野 4晚', paid: false },
  { id: 'fc6', title: '住宿 (Hotel Nikko)', amount: 0, note: '新潟 1晚', paid: false },
  { id: 'fc7', title: '住宿 (Toyoko Inn)', amount: 0, note: '成田 1晚', paid: false },
  { id: 'fc8', title: 'N\'EX 東京去回車票', amount: 10000, note: '5000 x 2人 (周遊券)', paid: true },
  { id: 'fc9', title: '新幹線 (東京-輕井澤)', amount: 22480, note: 'E48341 (2人)', paid: true },
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

// --- 資訊頁面 (新增車票夾) ---
const InfoView = () => (
  <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
    <h2 className="text-2xl font-bold text-stone-800 px-1">旅程資訊</h2>
    
    {/* 🚆 車票夾 (新增) */}
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="bg-green-700 px-4 py-3 flex items-center text-white">
        <Train className="w-5 h-5 mr-2" />
        <h3 className="font-bold">JR 車票夾</h3>
      </div>
      <div className="p-4 space-y-4">
        {/* 車票 1: N'EX 去回車票 */}
        <div className="border border-stone-200 rounded-lg p-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl">已付款</div>
          <div className="text-xs font-bold text-green-700 mb-1">票券 (主票)</div>
          <div className="font-bold text-stone-800">N'EX 東京去回車票 (周遊券)</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-stone-600">
            <div>預約號碼：<span className="font-mono font-bold text-stone-800">E83249</span></div>
            <div>啟用日：<span className="font-mono font-bold text-stone-800">01/17</span></div>
            <div>金額：<span className="font-mono text-stone-800">¥10,000</span></div>
            <div>期限：<span className="font-mono text-stone-800">14天</span></div>
          </div>
        </div>

        {/* 車票 2: N'EX 指定席 */}
        <div className="border border-stone-200 rounded-lg p-3 border-l-4 border-l-red-500">
          <div className="text-xs font-bold text-red-600 mb-1">指定席 (去程)</div>
          <div className="font-bold text-stone-800 mb-1">Narita-Express 4</div>
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-mono">08:12 成田 T1</span>
            <span className="text-stone-400">➔</span>
            <span className="font-mono">09:20 東京</span>
          </div>
          <div className="bg-stone-50 p-2 rounded text-xs flex justify-between">
            <span>7號車廂</span>
            <span className="font-bold text-lg text-stone-800">10A, 10B</span>
          </div>
        </div>

        {/* 車票 3: 新幹線 */}
        <div className="border border-stone-200 rounded-lg p-3 border-l-4 border-l-green-600">
          <div className="text-xs font-bold text-green-600 mb-1">新幹線 (東京-輕井澤)</div>
          <div className="font-bold text-stone-800 mb-1">預約號碼：E48341</div>
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-mono">10:07 東京</span>
            <span className="text-stone-400">➔</span>
            <span className="font-mono">11:11 輕井澤</span>
          </div>
          <div className="text-xs text-right text-stone-500">金額：¥22,480 (2人)</div>
        </div>

        {/* 待辦事項 */}
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-xs text-yellow-800">
          <strong>⚠️ 尚未預約：</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>N'EX 回程指定席 (憑去回券劃位)</li>
            <li>長野 ➔ 東京 回程車票</li>
          </ul>
        </div>
      </div>
    </div>

    {/* ✈️ 航班資訊 */}
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="bg-sky-700 px-4 py-3 flex items-center text-white">
        <Plane className="w-5 h-5 mr-2" />
        <h3 className="font-bold">航班資訊</h3>
      </div>
      <div className="p-4 space-y-5">
        <div className="text-xs text-stone-500 font-medium bg-stone-50 p-2 rounded border border-stone-100">
           旅客：CHANG SHIHHAO, BAI TSANHU
        </div>
        {/* 去程 */}
        <div className="relative">
           <div className="flex justify-between items-center mb-2">
             <div className="flex items-center">
               <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded mr-2">去程</span>
               <span className="font-bold text-stone-800 text-sm">樂桃 MM620</span>
             </div>
             <span className="text-xs text-stone-400">1/17 (六)</span>
           </div>
           <div className="flex items-center justify-between bg-stone-50 p-3 rounded-lg border border-stone-100 mb-2">
             <div className="text-center">
               <div className="text-2xl font-bold text-stone-800">02:25</div>
               <div className="text-xs text-stone-500 font-bold text-purple-700">TPE 桃園 T1</div>
             </div>
             <div className="flex-1 px-4 flex flex-col items-center">
               <div className="w-full h-px bg-stone-300 mb-1 relative">
                 <div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-stone-300 transform rotate-45"></div>
               </div>
               <span className="text-[10px] text-stone-400">3h 5m</span>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-stone-800">06:30</div>
               <div className="text-xs text-stone-500 font-bold text-purple-700">NRT 成田 T1</div>
             </div>
           </div>
           <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 mb-2">
             <div className="bg-stone-50 p-2 rounded border border-stone-100 flex items-center">
               <Ticket className="w-3 h-3 mr-1 text-stone-400"/>
               訂單：<span className="font-mono font-bold ml-1 text-stone-800">ESHHZ9</span>
             </div>
             <div className="bg-stone-50 p-2 rounded border border-stone-100">
               座位：<span className="font-bold text-stone-800">4B, 4C</span>
             </div>
           </div>
           <div className="bg-purple-50 p-2 rounded border border-purple-100 text-xs text-purple-900 space-y-1">
             <div className="flex items-center"><Luggage className="w-3 h-3 mr-1.5"/><strong>託運：</strong>1人 20kg + 1人 32kg</div>
             <div className="flex items-center pl-4.5 text-purple-700">手提：7kg /人</div>
           </div>
        </div>
        {/* 分隔線 */}
        <div className="border-t border-stone-100 border-dashed"></div>
        {/* 回程 */}
        <div>
           <div className="flex justify-between items-center mb-2">
             <div className="flex items-center">
               <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded mr-2">回程</span>
               <span className="font-bold text-stone-800 text-sm">捷星 GK13</span>
             </div>
             <span className="text-xs text-stone-400">1/24 (六)</span>
           </div>
           <div className="flex items-center justify-between bg-stone-50 p-3 rounded-lg border border-stone-100 mb-2">
             <div className="text-center">
               <div className="text-2xl font-bold text-stone-800">08:30</div>
               <div className="text-xs text-stone-500 font-bold text-orange-600">NRT 成田 T3</div>
             </div>
             <div className="flex-1 px-4 flex flex-col items-center">
               <div className="w-full h-px bg-stone-300 mb-1 relative">
                 <div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-stone-300 transform rotate-45"></div>
               </div>
               <span className="text-[10px] text-stone-400">4h 20m</span>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-stone-800">11:50</div>
               <div className="text-xs text-stone-500 font-bold text-orange-600">TPE 桃園 T1</div>
             </div>
           </div>
           <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 mb-2">
             <div className="bg-stone-50 p-2 rounded border border-stone-100 col-span-2">
               座位：<span className="font-bold text-stone-800">20E, 20F</span>
             </div>
           </div>
           <div className="bg-orange-50 p-2 rounded border border-orange-100 text-xs text-orange-900 space-y-1">
             <div className="flex items-center"><Luggage className="w-3 h-3 mr-1.5"/><strong>託運：</strong>30kg /人 (共 60kg)</div>
             <div className="flex items-center pl-4.5 text-orange-700">手提：7kg /人</div>
           </div>
        </div>
      </div>
    </div>
    
    {/* 租車詳細資訊 */}
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="bg-indigo-900 px-4 py-3 flex items-center justify-between text-white">
        <div className="flex items-center"><Car className="w-5 h-5 mr-2" /><h3 className="font-bold">Nippon 租車詳情</h3></div>
        <span className="text-xs bg-indigo-700 px-2 py-0.5 rounded">S-S Class</span>
      </div>
      <div className="p-4 space-y-5">
        <div>
           <h4 className="text-sm font-bold text-stone-800 mb-2 flex items-center"><Info className="w-4 h-4 mr-1 text-indigo-600"/> 車輛規格</h4>
           <ul className="text-sm text-stone-600 space-y-1 pl-1">
             <li className="flex justify-between border-b border-stone-50 pb-1"><span>車型</span><span className="font-medium">Fit / Yaris (同級)</span></li>
             <li className="flex justify-between border-b border-stone-50 pb-1"><span>驅動</span><span className="font-medium text-red-600 font-bold">4WD (需口頭確認)</span></li>
             <li className="flex justify-between border-b border-stone-50 pb-1"><span>輪胎</span><span className="font-medium">無釘雪胎 (已含)</span></li>
             <li className="flex justify-between"><span>禁煙</span><span className="font-medium">是</span></li>
           </ul>
        </div>
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
        <div>
           <h4 className="text-sm font-bold text-stone-800 mb-2 flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-green-600"/> 全套保險 (已含)</h4>
           <div className="text-xs text-stone-600 bg-green-50 p-3 rounded border border-green-100 space-y-1">
             <div className="flex items-center"><CheckSquare className="w-3 h-3 mr-2 text-green-600"/><span>免責補償 (CDW) - 免自負額</span></div>
             <div className="flex items-center"><CheckSquare className="w-3 h-3 mr-2 text-green-600"/><span>ECO (NOC補償) - 免營業損失</span></div>
             <div className="flex items-center"><CheckSquare className="w-3 h-3 mr-2 text-green-600"/><span>道路救援 (免費額度內)</span></div>
           </div>
        </div>
        <div>
           <h4 className="text-sm font-bold text-stone-800 mb-2 flex items-center"><FileWarning className="w-4 h-4 mr-1 text-orange-600"/> 取車必備文件</h4>
           <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside bg-orange-50 p-3 rounded border border-orange-100">
             <li>台灣駕照 <span className="font-bold">正本</span></li>
             <li>駕照 <span className="font-bold">日文譯本</span></li>
             <li>護照</li>
             <li><span className="font-bold text-red-600">實體信用卡 (末碼 3066)</span></li>
           </ul>
        </div>
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

// --- 清單頁面 ---
const ChecklistView = () => {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [activeType, setActiveType] = useState('prep'); // 'prep' or 'buy'

  useEffect(() => {
    const saved = localStorage.getItem('trip_checklist');
    if (saved) { setItems(JSON.parse(saved)); } else { setItems(defaultPrepItems); }
  }, []);

  useEffect(() => { localStorage.setItem('trip_checklist', JSON.stringify(items)); }, [items]);

  const toggleCheck = (id) => { setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)); };
  const addItem = (e) => {
    e.preventDefault(); if (!newItemText.trim()) return;
    setItems([...items, { id: Date.now().toString(), text: newItemText, checked: false, type: activeType }]);
    setNewItemText('');
  };
  const deleteItem = (id) => { setItems(items.filter(item => item.id !== id)); };
  const displayItems = items.filter(i => i.type === activeType);

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-stone-800 mb-6 px-1">準備與購物</h2>
      <div className="flex bg-stone-200 p-1 rounded-xl mb-6">
        <button onClick={() => setActiveType('prep')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeType === 'prep' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>行前準備</button>
        <button onClick={() => setActiveType('buy')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeType === 'buy' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>購物清單</button>
      </div>
      <form onSubmit={addItem} className="flex gap-2 mb-6">
        <input type="text" value={newItemText} onChange={(e) => setNewItemText(e.target.value)} placeholder={activeType === 'prep' ? "新增準備項目..." : "新增想買的東西..."} className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-stone-400 shadow-sm"/>
        <button type="submit" className="bg-stone-800 text-white w-12 rounded-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform"><Plus size={20} /></button>
      </form>
      <div className="space-y-3">
        {displayItems.length === 0 && <div className="text-center text-stone-400 py-8 text-sm">清單是空的</div>}
        {displayItems.map(item => (
          <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${item.checked ? 'bg-stone-50 border-stone-100 opacity-60' : 'bg-white border-stone-100 shadow-sm'}`}>
            <div className="flex items-center flex-1 cursor-pointer" onClick={() => toggleCheck(item.id)}>
              <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${item.checked ? 'bg-indigo-500 border-indigo-500' : 'border-stone-300'}`}>{item.checked && <CheckSquare size={14} className="text-white" />}</div>
              <span className={`text-sm font-medium ${item.checked ? 'text-stone-400 line-through' : 'text-stone-700'}`}>{item.text}</span>
            </div>
            <button onClick={() => deleteItem(item.id)} className="text-stone-300 hover:text-red-400 p-2"><X size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 全新記帳頁面 (含固定支出) ---
const BudgetView = () => {
  const [dailyItems, setDailyItems] = useState([]);
  const [fixedItems, setFixedItems] = useState([]);
  
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');

  useEffect(() => {
    const savedDaily = localStorage.getItem('trip_budget');
    if (savedDaily) setDailyItems(JSON.parse(savedDaily));

    const savedFixed = localStorage.getItem('trip_fixed_costs');
    if (savedFixed) {
      setFixedItems(JSON.parse(savedFixed));
    } else {
      setFixedItems(defaultFixedCosts);
    }
  }, []);

  useEffect(() => { localStorage.setItem('trip_budget', JSON.stringify(dailyItems)); }, [dailyItems]);
  useEffect(() => { localStorage.setItem('trip_fixed_costs', JSON.stringify(fixedItems)); }, [fixedItems]);

  const addDailyItem = (e) => {
    e.preventDefault(); if (!desc || !amount) return;
    setDailyItems([{ id: Date.now(), desc, amount: parseInt(amount), category, date: new Date().toLocaleDateString() }, ...dailyItems]);
    setDesc(''); setAmount('');
  };
  const deleteDailyItem = (id) => { setDailyItems(dailyItems.filter(i => i.id !== id)); };

  const updateFixedAmount = (id, newAmount) => {
    setFixedItems(fixedItems.map(item => item.id === id ? { ...item, amount: parseInt(newAmount) || 0 } : item));
  };
  const toggleFixedPaid = (id) => {
    setFixedItems(fixedItems.map(item => item.id === id ? { ...item, paid: !item.paid } : item));
  };

  const totalDaily = dailyItems.reduce((sum, item) => sum + item.amount, 0);
  const totalFixed = fixedItems.reduce((sum, item) => sum + item.amount, 0);
  const grandTotal = totalDaily + totalFixed;

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-stone-800 mb-4 px-1">旅費管理</h2>

      {/* 總儀表板 */}
      <div className="bg-stone-800 rounded-2xl p-5 text-white shadow-lg mb-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-stone-400 text-xs mb-1">總支出預估 (JPY)</div>
            <div className="text-3xl font-bold font-mono tracking-tight">{grandTotal.toLocaleString()}</div>
          </div>
          <div className="text-right">
             <div className="text-xs text-stone-400">日常: {totalDaily.toLocaleString()}</div>
             <div className="text-xs text-stone-400">固定: {totalFixed.toLocaleString()}</div>
          </div>
        </div>
        <div className="w-full h-2 bg-stone-700 rounded-full overflow-hidden flex">
          <div className="bg-indigo-500 h-full" style={{ width: `${grandTotal === 0 ? 0 : (totalFixed / grandTotal) * 100}%` }}></div>
          <div className="bg-orange-500 h-full" style={{ width: `${grandTotal === 0 ? 0 : (totalDaily / grandTotal) * 100}%` }}></div>
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-stone-500">
          <span className="flex items-center"><div className="w-2 h-2 bg-indigo-500 rounded-full mr-1"></div>固定支出</span>
          <span className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>日常花費</span>
        </div>
      </div>

      {/* 固定支出區塊 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3 flex items-center"><DollarSign className="w-5 h-5 mr-1 text-indigo-600"/> 固定大額支出</h3>
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
          {fixedItems.map(item => (
            <div key={item.id} className="p-3 border-b border-stone-100 last:border-0 flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm font-bold text-stone-700">{item.title}</div>
                <div className="text-xs text-stone-400">{item.note}</div>
              </div>
              <div className="flex items-center gap-3">
                <input type="number" value={item.amount === 0 ? '' : item.amount} placeholder="0" onChange={(e) => updateFixedAmount(item.id, e.target.value)} className="w-20 text-right bg-stone-50 border border-stone-200 rounded px-2 py-1 text-sm focus:border-indigo-500 outline-none font-mono"/>
                <button onClick={() => toggleFixedPaid(item.id)} className={`p-1.5 rounded-full border ${item.paid ? 'bg-green-100 text-green-600 border-green-200' : 'bg-stone-50 text-stone-300 border-stone-200'}`}><CheckSquare size={16} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-center text-stone-400 mt-2">勾選右側代表「已付款」</div>
      </div>

      {/* 日常記帳區塊 */}
      <div>
        <h3 className="text-lg font-bold text-stone-800 mb-3 flex items-center"><PieChart className="w-5 h-5 mr-1 text-orange-600"/> 日常隨手記</h3>
        <form onSubmit={addDailyItem} className="bg-white p-3 rounded-xl shadow-sm border border-stone-200 mb-4">
          <div className="grid grid-cols-4 gap-2 mb-3">
            {['food', 'transport', 'shopping', 'other'].map(cat => (
              <button key={cat} type="button" onClick={() => setCategory(cat)} className={`p-2 rounded-lg flex justify-center ${category === cat ? 'bg-orange-100 text-orange-600' : 'bg-stone-50 text-stone-400'}`}>
                {cat === 'food' && <Utensils size={18} />}{cat === 'transport' && <Car size={18} />}{cat === 'shopping' && <ShoppingBag size={18} />}{cat === 'other' && <Wallet size={18} />}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="項目 (例: 販賣機)" className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <input type="number" placeholder="金額" className="w-20 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button type="submit" className="bg-stone-800 text-white px-3 rounded-lg"><Plus size={18} /></button>
          </div>
        </form>
        <div className="space-y-2">
          {dailyItems.length === 0 && <div className="text-center text-stone-400 py-4 text-xs">還沒有花費，開始記帳吧！</div>}
          {dailyItems.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-100 shadow-sm">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center mr-3 ${item.category === 'food' ? 'text-orange-500' : item.category === 'transport' ? 'text-blue-500' : item.category === 'shopping' ? 'text-pink-500' : 'text-green-500'}`}>
                  {item.category === 'food' && <Utensils size={14} />}{item.category === 'transport' && <Car size={14} />}{item.category === 'shopping' && <ShoppingBag size={14} />}{item.category === 'other' && <Wallet size={14} />}
                </div>
                <div><div className="font-medium text-sm text-stone-700">{item.desc}</div><div className="text-[10px] text-stone-400">{item.date}</div></div>
              </div>
              <div className="flex items-center"><span className="font-mono font-bold text-stone-700 mr-3">¥{item.amount.toLocaleString()}</span><button onClick={() => deleteDailyItem(item.id)} className="text-stone-300 hover:text-red-400"><Trash2 size={14} /></button></div>
            </div>
          ))}
        </div>
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
