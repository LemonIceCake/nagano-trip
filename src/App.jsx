import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Coffee, Utensils, ShoppingBag, Car, Navigation, 
  CloudSnow, CloudSun, Hotel, Phone, Trash2, AlertTriangle, Info, CreditCard, Wallet,
  ExternalLink, Search
} from 'lucide-react';

// --- 行程資料 ---
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
    alert: "今日取車！請檢查雪胎與 AWD。",
    activities: [
      {
        id: "2-1", time: "10:00", type: "transport", title: "租車取車", location: "Nissan Rent-a-car Nagano Station",
        desc: "確認雪胎、雨刷狀況，設定導航。",
        highlight: "檢查：除雪刷是否在車上",
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
    location: "長野 ➔ 東京",
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
      }
    ]
  },
  {
    day: 8,
    date: "1/24 (六)",
    title: "返程",
    location: "東京 ➔ 機場",
    weather: { temp: "9°C", condition: "cloudy" },
    activities: [
      {
        id: "8-1", time: "--:--", type: "transport", title: "前往機場",
        desc: "搭乘 Narita Express 或利木津巴士前往機場。",
        alert: "請預留 3 小時抵達機場"
      }
    ]
  }
];

// --- 元件 ---

const WeatherIcon = ({ condition }) => {
  if (condition === 'snow') return <CloudSnow className="w-5 h-5 text-indigo-400" />;
  if (condition === 'sunny') return <CloudSun className="w-5 h-5 text-orange-400" />;
  return <CloudSnow className="w-5 h-5 text-gray-400" />;
};

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

// --- 更新後的資訊頁面 (含 App 連結) ---
const InfoView = () => (
  <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
    <h2 className="text-2xl font-bold text-stone-800 px-1">旅程資訊</h2>
    
    {/* 住宿區塊 */}
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="bg-stone-800 px-4 py-3 flex items-center text-white"><Hotel className="w-5 h-5 mr-2" /><h3 className="font-bold">住宿安排</h3></div>
      <div className="p-4 space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <div className="text-xs text-stone-400 mb-1">1/17 (1晚)</div>
          <div className="font-bold">Hotel JAL City Nagano</div>
          <a href="https://www.agoda.com/zh-tw/search?text=Hotel%20JAL%20City%20Nagano" target="_blank" rel="noreferrer" className="mt-2 flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800">
            <ExternalLink className="w-3 h-3 mr-1" />Agoda 查看/訂單
          </a>
        </div>
        <div className="border-b border-stone-100 pb-3">
          <div className="text-xs text-stone-400 mb-1">1/18-20, 1/21-23 (4晚)</div>
          <div className="font-bold">相鐵 Fresa Inn 長野東口</div>
          <a href="https://www.agoda.com/zh-tw/search?text=Sotetsu%20Fresa%20Inn%20Nagano-Higashiguchi" target="_blank" rel="noreferrer" className="mt-2 flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800">
            <ExternalLink className="w-3 h-3 mr-1" />Agoda 查看/訂單
          </a>
        </div>
        <div className="border-b border-stone-100 pb-3">
          <div className="text-xs text-stone-400 mb-1">1/20 (1晚)</div>
          <div className="font-bold">Hotel Nikko Niigata</div>
           <a href="https://www.agoda.com/zh-tw/search?text=Hotel%20Nikko%20Niigata" target="_blank" rel="noreferrer" className="mt-2 flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800">
            <ExternalLink className="w-3 h-3 mr-1" />Agoda 查看/訂單
          </a>
        </div>
        <div>
          <div className="text-xs text-stone-400 mb-1">1/23 (1晚)</div>
          <div className="font-bold">Daiwa Roynet Kyobashi</div>
          <a href="https://www.agoda.com/zh-tw/search?text=Daiwa%20Roynet%20Hotel%20Tokyo%20Kyobashi" target="_blank" rel="noreferrer" className="mt-2 flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800">
            <ExternalLink className="w-3 h-3 mr-1" />Agoda 查看/訂單
          </a>
        </div>
      </div>
    </div>

    {/* 租車區塊 */}
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="bg-indigo-900 px-4 py-3 flex items-center text-white"><Car className="w-5 h-5 mr-2" /><h3 className="font-bold">租車資訊</h3></div>
      <div className="p-4 text-sm text-stone-700 space-y-4">
        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-indigo-900">Nissan Rent-a-car</span>
                <span className="bg-white text-indigo-800 text-xs px-2 py-1 rounded border border-indigo-200">長野站東口店</span>
            </div>
            <div className="flex gap-2">
                <a href="https://www.google.com/maps/search/?api=1&query=Nissan+Rent-a-Car+Nagano+Station" target="_blank" rel="noreferrer" className="flex-1 bg-white border border-indigo-200 text-indigo-700 py-1.5 rounded flex items-center justify-center text-xs font-medium">
                    <Navigation className="w-3 h-3 mr-1" />導航前往
                </a>
                <a href="https://www.klook.com/zh-TW/car-rentals/" target="_blank" rel="noreferrer" className="flex-1 bg-orange-500 text-white py-1.5 rounded flex items-center justify-center text-xs font-medium">
                    <Search className="w-3 h-3 mr-1" />Klook 訂單
                </a>
            </div>
        </div>
        <div className="space-y-2 pt-2">
            <div className="flex justify-between border-b border-stone-100 pb-2"><span className="text-stone-500">取車</span><span className="font-medium">1/18 10:00</span></div>
            <div className="flex justify-between"><span className="text-stone-500">還車</span><span className="font-medium">1/23 上午</span></div>
        </div>
        <div className="mt-3 bg-red-50 p-3 rounded text-red-800 text-xs leading-relaxed"><strong className="block mb-1">⚠️ 冬季駕駛注意：</strong>確認配備雪胎 (Snow Tires) 與 4WD。遇黑冰路段請勿急煞。</div>
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
        {activeTab === 'budget' && <BudgetView />}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 pb-safe z-50 safe-area-pb">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'itinerary' ? 'text-stone-900' : 'text-stone-400'}`}><Calendar className="w-6 h-6" /><span className="text-[10px] font-medium">行程</span></button>
          <button onClick={() => setActiveTab('info')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'info' ? 'text-stone-900' : 'text-stone-400'}`}><Info className="w-6 h-6" /><span className="text-[10px] font-medium">資訊</span></button>
          <button onClick={() => setActiveTab('budget')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'budget' ? 'text-stone-900' : 'text-stone-400'}`}><CreditCard className="w-6 h-6" /><span className="text-[10px] font-medium">記帳</span></button>
        </div>
      </nav>
      <style>{` .pb-safe { padding-bottom: env(safe-area-inset-bottom); } `}</style>
    </div>
  );
};

export default App;


