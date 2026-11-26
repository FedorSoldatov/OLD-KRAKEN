import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Crosshair, Menu, X } from 'lucide-react';
import './styles.css';

const zones = [
  { tag: 'DECK 01', name: 'COMMAND DECK', meta: '30 PC · 360 Hz · RTX 5070', seats: '12 свободно', color: 'cyan', image: '/command-deck.png', description: 'Основная палуба клуба: быстрые мониторы, мощное железо и достаточно пространства для долгих командных сессий.' },
  { tag: 'DECK 02', name: 'CAPTAIN’S CABIN', meta: 'PS5 Pro · 65″ OLED · 4 места', seats: '03 свободно', color: 'copper', image: '/captains-cabin.png', description: 'Закрытая каюта для своей команды. Большой OLED-экран, консольный комфорт и морская атмосфера без посторонних.' },
  { tag: 'DECK 03', name: 'THE HOLD', meta: 'Bootcamp · 10 PC · отдельный вход', seats: 'вся зона', color: 'cyan', image: '/gaming-port-setups.png', description: 'Отдельный отсек для bootcamp, тренировок и турниров. Десять станций, личный вход и максимум концентрации.' },
];
const mapSeats = [
  ...Array.from({length:5},(_,i)=>({id:`B1-${i+1}`,zone:'BOOTCAMP 1'})),...Array.from({length:5},(_,i)=>({id:`B2-${i+1}`,zone:'BOOTCAMP 2'})),
  ...Array.from({length:2},(_,i)=>({id:`D1-${i+1}`,zone:'DUO 1'})),...Array.from({length:2},(_,i)=>({id:`D2-${i+1}`,zone:'DUO 2'})),...Array.from({length:2},(_,i)=>({id:`D3-${i+1}`,zone:'DUO 3'})),
  ...Array.from({length:5},(_,i)=>({id:`VIP-${i+1}`,zone:'VIP BOOTCAMP'})),...Array.from({length:5},(_,i)=>({id:`PREM-${i+1}`,zone:'PREMIUM BOOTCAMP'})),
];
const occupiedSeats = new Set(['B1-2','B2-4','D1-1','D3-2','VIP-3','PREM-5']);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [booked, setBooked] = useState(false);
  const [openZone, setOpenZone] = useState(null);
  const [logoOpen, setLogoOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyNotice, setPrivacyNotice] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hours, setHours] = useState(2);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [guest, setGuest] = useState({name:'',phone:'',date:'2026-11-27',time:'18:00'});
  const toggleSeat = (id) => !occupiedSeats.has(id) && setSelectedSeats((seats) => seats.includes(id) ? seats.filter((seat) => seat !== id) : [...seats,id]);
  const total = selectedSeats.length * hours * 6;
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return <main>
    <header className="topbar">
      <button className="brand" onClick={() => setLogoOpen(true)} aria-label="Открыть логотип Old Kraken"><img src="/old-kraken-logo.png" alt="Old Kraken"/><span>OLD KRAKEN</span></button>
      <nav className={menuOpen ? 'open' : ''}>
        <button onClick={() => scrollTo('club')}>КЛУБ</button><button onClick={() => scrollTo('zones')}>ЖЕЛЕЗО</button><button onClick={() => scrollTo('prices')}>ЦЕНЫ</button><button onClick={() => scrollTo('offers')}>АКЦИИ</button>
      </nav>
      <button className="reserve mini" onClick={() => scrollTo('reserve')}>ЗАБРОНИРОВАТЬ <ArrowUpRight size={16}/></button>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section id="home" className="hero">
      <div className="scanlines"/><div className="hero-copy">
        <h1 className="hero-title" aria-label="Old Kraken"><span className="old-word">OLD</span><b className="kraken-word">KRAKEN</b></h1>
        <div className="hero-actions"><button className="reserve cyber-button" onClick={() => scrollTo('reserve')}>ВЫБРАТЬ МЕСТО <ArrowUpRight size={18}/></button><p className="hero-command">READY TO PLAY<span className="command-caret">_</span></p></div>
      </div>
      <img className="hero-kraken" src="/kraken-dualsense-tentacles.png" alt="Щупальца кракена держат зелёный контроллер DualSense"/>
    </section>

    <section id="club" className="manifest"><p className="eyebrow">КЛУБ OLD KRAKEN</p><h1>НЕ КОМПЬЮТЕРНЫЙ КЛУБ.<br/><span>БАЗА В БЫВШЕМ ПОРТУ.</span></h1><div className="manifest-grid"><p>OLD KRAKEN расположен в бывшем здании порта на набережной Бреста. Мы сохранили характер места: сталь, бетон, солёный воздух и свет мониторов — и превратили его в базу для тех, кто играет глубже.</p><div className="specs"><span><b>48</b> игровых станций</span><span><b>24/7</b> открыты к рейду</span><span><b>1 GB</b> оптика без лагов</span></div></div></section>

    <section id="zones" className="zones"><div className="section-head"><p className="eyebrow">ИГРОВЫЕ ЗОНЫ</p><h2>ВЫБЕРИ СВОЙ<br/><span>ОТСЕК.</span></h2></div><div className="zone-list">{zones.map((zone, i) => <article key={zone.tag} className={'zone '+(active===i?'selected':'')} onClick={() => {setActive(i);setOpenZone(i)}}><img className="zone-photo" src={zone.image} alt=""/><div><h3>{zone.name}</h3><p>{zone.meta}</p></div><div className={'seat '+zone.color}>{zone.seats}</div><button aria-label={'Открыть '+zone.name}><ArrowUpRight/></button></article>)}</div></section>

    <section id="prices" className="prices"><div className="section-head"><p className="eyebrow">ТАРИФЫ КЛУБА</p><h2>ЧЕСТНЫЕ<br/><span>ЦЕНЫ.</span></h2></div><div className="price-grid"><article><span>БУДНИ</span><h3>ОТ 6 BYN</h3><p>за час игры на PC</p><button onClick={() => scrollTo('reserve')}>ЗАБРОНИРОВАТЬ <ArrowUpRight size={16}/></button></article><article className="featured"><span>НОЧНОЙ РЕЙД</span><h3>25 BYN</h3><p>с 23:00 до 08:00</p><button onClick={() => scrollTo('reserve')}>ВЫБРАТЬ РЕЙД <ArrowUpRight size={16}/></button></article><article><span>КОНСОЛЬНАЯ КАЮТА</span><h3>ОТ 18 BYN</h3><p>за час для команды</p><button onClick={() => scrollTo('reserve')}>ЗАБРОНИРОВАТЬ <ArrowUpRight size={16}/></button></article></div></section>

    <section id="offers" className="offers"><div><p className="eyebrow">ПРЕДЛОЖЕНИЯ КЛУБА</p><h2>АКЦИИ ДЛЯ<br/><span>ЭКИПАЖА.</span></h2></div><div className="offer-list"><article><div><h3>ПЕРВЫЙ СПУСК</h3><p>Скидка 20% на первое посещение клуба.</p></div></article><article><div><h3>ПРИВЕДИ НА БОРТ</h3><p>Приводи друга — оба получаете дополнительный час.</p></div></article><article><div><h3>КОМАНДНЫЙ РЕЙД</h3><p>Специальные условия для bootcamp и турниров.</p></div></article></div></section>

    <section id="reserve" className="booking"><div><p className="eyebrow">БРОНИРОВАНИЕ</p><h2>ЗАЙМИ МЕСТО<br/>В <span>ЭКИПАЖЕ.</span></h2><p className="booking-note">Выбранная зона: <strong>{zones[active].name}</strong></p></div><form onSubmit={(e)=>{e.preventDefault();privacyAccepted?setBookingOpen(true):setPolicyOpen(true)}}>{booked ? <div className="success"><Crosshair/><h3>ЗАЯВКА ПРИНЯТА</h3><p>Координатор порта свяжется с вами.</p></div> : <><label>ТВОЙ ПОЗЫВНОЙ<input required value={guest.name} onChange={(e)=>setGuest({...guest,name:e.target.value})} placeholder="Имя"/></label><label>СВЯЗЬ<input required type="tel" value={guest.phone} onChange={(e)=>setGuest({...guest,phone:e.target.value})} placeholder="+375 (__) ___-__-__"/></label><button className="reserve" type="submit">ПРОДОЛЖИТЬ БРОНИРОВАНИЕ <ArrowUpRight size={18}/></button><small>Для продолжения необходимо согласие с политикой конфиденциальности.</small></>}</form></section>

    <footer id="contacts"><button className="footer-mark" onClick={() => setLogoOpen(true)} aria-label="Открыть логотип"><img src="/old-kraken-logo.png" alt="Old Kraken"/><span>OLD KRAKEN</span></button><p>БРЕСТ · ПОРТОВАЯ ЛИНИЯ 19<br/>ЕЖЕДНЕВНО 10:00—06:00</p><div className="social"><a href="#home">VK</a><a href="#home">TG</a><a href="#home">IG</a></div></footer>
    {openZone !== null && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={zones[openZone].name} onClick={() => setOpenZone(null)}><article className="zone-modal" onClick={(e) => e.stopPropagation()}><img src={zones[openZone].image} alt={zones[openZone].name}/><div className="modal-copy"><button className="modal-close" onClick={() => setOpenZone(null)} aria-label="Закрыть"><X/></button><p className="eyebrow">ИГРОВАЯ ЗОНА</p><h2>{zones[openZone].name}</h2><p>{zones[openZone].description}</p><div className={'seat '+zones[openZone].color}>{zones[openZone].seats}</div><button className="reserve" onClick={() => {setOpenZone(null);scrollTo('reserve')}}>ЗАБРОНИРОВАТЬ <ArrowUpRight size={18}/></button></div></article></div>}
    {logoOpen && <div className="modal-backdrop logo-backdrop" role="dialog" aria-modal="true" aria-label="Логотип Old Kraken" onClick={() => setLogoOpen(false)}><div className="logo-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setLogoOpen(false)} aria-label="Закрыть"><X/></button><img src="/old-kraken-logo.png" alt="Логотип Old Kraken"/></div></div>}
    {policyOpen && <div className="modal-backdrop policy-backdrop" role="dialog" aria-modal="true" aria-labelledby="policy-title" onClick={() => setPolicyOpen(false)}><article className="policy-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setPolicyOpen(false)} aria-label="Закрыть"><X/></button><p className="eyebrow">ВАЖНО</p><h2 id="policy-title">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h2><div className="policy-text"><p>Мы используем ваше имя и номер телефона только для обработки заявки и связи по бронированию.</p><p>Данные не передаются третьим лицам и хранятся только столько, сколько необходимо для ответа на вашу заявку.</p></div><button className="reserve" onClick={() => {setPrivacyAccepted(true);setPolicyOpen(false);setBookingOpen(true)}}>Я СОГЛАСЕН С ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ <ArrowUpRight size={18}/></button></article></div>}
    {privacyNotice && <aside className="privacy-notice"><button className="notice-close" onClick={()=>setPrivacyNotice(false)} aria-label="Закрыть"><X size={16}/></button><b>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</b><p>Разрешаете обработку данных для бронирования?</p><div><button className="reserve" onClick={()=>{setPrivacyAccepted(true);setPrivacyNotice(false)}}>ДА</button><button className="notice-no" onClick={()=>setPrivacyNotice(false)}>НЕТ</button></div></aside>}
    {bookingOpen && <div className="modal-backdrop booking-backdrop" role="dialog" aria-modal="true"><section className="booking-wizard"><button className="modal-close" onClick={()=>setBookingOpen(false)} aria-label="Закрыть"><X/></button><div className="wizard-progress"><span className={bookingStep>=1?'active':''}>1. ВРЕМЯ</span><span className={bookingStep>=2?'active':''}>2. МЕСТА</span><span className={bookingStep>=3?'active':''}>3. ЗАКАЗ</span></div>{bookingStep===1&&<div className="wizard-step"><p className="eyebrow">ШАГ 01</p><h2>ВЫБЕРИ ДАТУ<br/>И ВРЕМЯ</h2><div className="select-grid"><label>ДАТА<select value={guest.date} onChange={e=>setGuest({...guest,date:e.target.value})}><option>2026-11-27</option><option>2026-11-28</option><option>2026-11-29</option></select></label><label>ВРЕМЯ<select value={guest.time} onChange={e=>setGuest({...guest,time:e.target.value})}><option>12:00</option><option>15:00</option><option>18:00</option><option>21:00</option></select></label></div><button className="reserve" onClick={()=>setBookingStep(2)}>ДАЛЬШЕ <ArrowUpRight size={18}/></button></div>}{bookingStep===2&&<div className="wizard-step map-step"><p className="eyebrow">ШАГ 02 · ВЫБОР МЕСТ</p><h2>КАРТА<br/><span>КЛУБА</span></h2><div className="map-legend"><span><i className="picked"/>ВЫБРАНО</span><span><i className="free"/>СВОБОДНО</span><span><i className="busy"/>ЗАНЯТО</span></div><div className="club-map"><img src="/club-map.png" alt="Схема игрового клуба"/><div className="seat-map">{mapSeats.map((seat,index)=><button key={seat.id} title={seat.zone} onClick={()=>toggleSeat(seat.id)} className={(occupiedSeats.has(seat.id)?'busy ':selectedSeats.includes(seat.id)?'picked ':'free ')+`seat s${index+1}`}>{seat.id}</button>)}</div></div><label className="hours">КОЛИЧЕСТВО ЧАСОВ<select value={hours} onChange={e=>setHours(Number(e.target.value))}>{[1,2,3,4,5,6].map(h=><option key={h} value={h}>{h} ч.</option>)}</select></label><button className="reserve" disabled={!selectedSeats.length} onClick={()=>setBookingStep(3)}>РАССЧИТАТЬ ТАРИФ <ArrowUpRight size={18}/></button></div>}{bookingStep===3&&<div className="wizard-step order-step"><p className="eyebrow">ШАГ 03 · ЗАКАЗ</p><h2>ДЕТАЛИ<br/><span>БРОНИ</span></h2><div className="order-summary"><span>КЛИЕНТ <b>{guest.name}</b></span><span>ВРЕМЯ <b>{guest.date} · {guest.time}</b></span><span>МЕСТА <b>{selectedSeats.join(', ')}</b></span><span>ДЛИТЕЛЬНОСТЬ <b>{hours} ч.</b></span><strong>ИТОГО <b>{total} BYN</b></strong></div><label className="rules"><input type="checkbox" checked={rulesAccepted} onChange={e=>setRulesAccepted(e.target.checked)}/> <span>Я согласен с правилами бронирования</span></label><button className="reserve" disabled={!rulesAccepted} onClick={()=>{setBookingOpen(false);setBooked(true)}}>ПОДТВЕРДИТЬ И ЗАБРОНИРОВАТЬ <ArrowUpRight size={18}/></button></div>}</section></div>}
  </main>
}
createRoot(document.getElementById('root')).render(<App/>);
