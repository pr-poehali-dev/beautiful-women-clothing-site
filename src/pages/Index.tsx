import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const IMG = {
  orange: 'https://cdn.poehali.dev/projects/b8737cb9-7feb-4f40-b12d-2d9ceb8ab163/files/09621b30-2131-437e-82a1-8433de738386.jpg',
  teal: 'https://cdn.poehali.dev/projects/b8737cb9-7feb-4f40-b12d-2d9ceb8ab163/files/9972e4d3-86fd-4f71-9178-3a434388ca49.jpg',
  magenta: 'https://cdn.poehali.dev/projects/b8737cb9-7feb-4f40-b12d-2d9ceb8ab163/files/7a6ecfdc-8edb-4356-97a2-51d91f52c12d.jpg',
  shortsOrange: 'https://cdn.poehali.dev/projects/b8737cb9-7feb-4f40-b12d-2d9ceb8ab163/files/91aeef5b-f36e-4907-9bda-934b42165598.jpg',
  shortsTeal: 'https://cdn.poehali.dev/projects/b8737cb9-7feb-4f40-b12d-2d9ceb8ab163/files/920afc46-e805-4cc1-bcaa-a6fc8f57c149.jpg',
};

const NAV = ['Каталог', 'О бренде', 'Портфолио', 'Доставка', 'Отзывы', 'Блог', 'Контакты'];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Оранжевый', hex: '#f25c1a' },
  { name: 'Лайм', hex: '#aee219' },
  { name: 'Бирюза', hex: '#1aa9a0' },
  { name: 'Магента', hex: '#d6219b' },
  { name: 'Графит', hex: '#2b2b33' },
];
const TYPES = ['Комбинезоны', 'Куртки', 'Брюки', 'Жилеты'];

type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  img: string;
  color: string;
  sizes: string[];
  tag?: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Комбинезон NOVA', type: 'Комбинезоны', price: 7490, img: IMG.orange, color: 'Оранжевый', sizes: ['S', 'M', 'L', 'XL'], tag: 'Хит' },
  { id: 2, name: 'Куртка PULSE', type: 'Куртки', price: 6190, img: IMG.teal, color: 'Бирюза', sizes: ['XS', 'S', 'M', 'L'], tag: 'Новинка' },
  { id: 3, name: 'Костюм EDGE', type: 'Куртки', price: 8990, img: IMG.magenta, color: 'Магента', sizes: ['M', 'L', 'XL', 'XXL'] },
  { id: 4, name: 'Жилет SIGNAL', type: 'Жилеты', price: 3290, img: IMG.orange, color: 'Оранжевый', sizes: ['S', 'M', 'L'], tag: 'Хит' },
  { id: 5, name: 'Брюки FLOW', type: 'Брюки', price: 4590, img: IMG.teal, color: 'Бирюза', sizes: ['M', 'L', 'XL'] },
  { id: 6, name: 'Комбинезон BOLD', type: 'Комбинезоны', price: 7990, img: IMG.magenta, color: 'Магента', sizes: ['XS', 'S', 'M', 'L', 'XL'], tag: 'Новинка' },
];

const REVIEWS = [
  { name: 'Алина К.', role: 'Логистика, Москва', text: 'Заказала комбинезоны для всей бригады — девчонки в восторге. Сидят идеально и выглядят дорого.' },
  { name: 'Марина С.', role: 'Производство, Казань', text: 'Наконец-то спецодежда, в которой не стыдно. Яркие цвета, плотная ткань, удобные карманы.' },
  { name: 'Ольга В.', role: 'HoReCa, Санкт-Петербург', text: 'Фильтры по размерам спасли — собрала комплект на 12 человек за 10 минут.' },
];

const BLOG = [
  { tag: 'Гид', title: 'Как выбрать спецодежду по типу работ', read: '5 мин' },
  { tag: 'Уход', title: '7 правил, чтобы форма служила годами', read: '4 мин' },
  { tag: 'Тренды', title: 'Цвет сезона: безопасность в стиле', read: '3 мин' },
];

const Index = () => {
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [activeTypes, setActiveTypes] = useState<string[]>([]);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (activeTypes.length === 0 || activeTypes.includes(p.type)) &&
          (activeColors.length === 0 || activeColors.includes(p.color)) &&
          (activeSizes.length === 0 || p.sizes.some((s) => activeSizes.includes(s)))
      ),
    [activeSizes, activeColors, activeTypes]
  );

  const resetAll = () => {
    setActiveSizes([]);
    setActiveColors([]);
    setActiveTypes([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground noise-grid">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-brand-ink bg-background/90 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="font-display text-2xl font-700 tracking-tight">
            FORMA<span className="text-brand-orange">.</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <a key={n} href={`#${n}`} className="font-display text-sm uppercase tracking-wide text-brand-ink/70 hover:text-brand-orange transition-colors">
                {n}
              </a>
            ))}
          </nav>
          <Button className="rounded-none bg-brand-ink text-background font-display uppercase tracking-wide hover:bg-brand-orange">
            <Icon name="ShoppingBag" size={18} />
            Корзина
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container relative overflow-hidden py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 bg-brand-lime px-4 py-1.5 font-display text-xs uppercase tracking-widest text-brand-ink">
              <Icon name="Sparkles" size={14} /> Коллекция 2026
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl xl:text-8xl font-700 leading-[0.9] uppercase">
              Спецодежда,<br />
              <span className="text-brand-orange">в которой</span><br />
              <span className="text-stroke">сияют</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-brand-ink/70">
              Яркие модели, премиальные ткани и каталог с умными фильтрами по размеру, цвету и типу. Форма, которой гордятся.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="rounded-none h-14 px-8 bg-brand-orange text-background font-display text-base uppercase tracking-wide hover:bg-brand-ink hover-scale">
                Смотреть каталог <Icon name="ArrowRight" size={20} />
              </Button>
              <Button variant="outline" className="rounded-none h-14 px-8 border-2 border-brand-ink font-display text-base uppercase tracking-wide hover:bg-brand-ink hover:text-background">
                О бренде
              </Button>
            </div>
            <div className="mt-10 flex gap-8">
              {[['12k+', 'клиентов'], ['98%', 'довольны'], ['250+', 'моделей']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-700">{n}</div>
                  <div className="text-sm text-brand-ink/60 uppercase tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-ink" />
            <img src={IMG.orange} alt="Модель в спецодежде" className="relative w-full aspect-[4/5] object-cover" />
            <div className="absolute bottom-4 right-4 bg-brand-lime px-5 py-3 font-display uppercase tracking-wide text-brand-ink">
              NOVA — 7 490 ₽
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y-2 border-brand-ink bg-brand-ink py-3 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8 font-display uppercase tracking-widest text-background text-sm">
              {['Бесплатная доставка от 5000 ₽', '★', 'Размеры XS–XXL', '★', 'Корпоративные заказы', '★', 'Возврат 30 дней', '★'].map((t, j) => (
                <span key={j}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Catalog */}
      <section id="Каталог" className="container py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <h2 className="font-display text-4xl md:text-6xl font-700 uppercase">Каталог</h2>
          <p className="text-brand-ink/60 max-w-sm">Подбери комплект по размеру, цвету и типу — фильтры обновляют витрину мгновенно.</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          {/* Filters */}
          <aside className="space-y-8 lg:sticky lg:top-24 self-start border-2 border-brand-ink p-6 bg-card">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg uppercase">Фильтры</span>
              <button onClick={resetAll} className="text-sm text-brand-orange hover:underline">Сбросить</button>
            </div>

            <div>
              <p className="font-display text-sm uppercase tracking-wide mb-3">Тип</p>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggle(activeTypes, setActiveTypes, t)}
                    className={`px-3 py-1.5 text-sm border-2 border-brand-ink transition-colors ${activeTypes.includes(t) ? 'bg-brand-ink text-background' : 'hover:bg-brand-lime'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-display text-sm uppercase tracking-wide mb-3">Размер</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggle(activeSizes, setActiveSizes, s)}
                    className={`w-11 h-11 font-display text-sm border-2 border-brand-ink transition-colors ${activeSizes.includes(s) ? 'bg-brand-orange text-background' : 'hover:bg-brand-lime'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-display text-sm uppercase tracking-wide mb-3">Цвет</p>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => toggle(activeColors, setActiveColors, c.name)}
                    title={c.name}
                    className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${activeColors.includes(c.name) ? 'border-brand-ink ring-2 ring-offset-2 ring-brand-ink' : 'border-brand-ink/30'}`}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <p className="mb-6 text-sm text-brand-ink/60 uppercase tracking-wide">Найдено: {filtered.length}</p>
            {filtered.length === 0 ? (
              <div className="border-2 border-dashed border-brand-ink p-16 text-center">
                <Icon name="SearchX" size={40} className="mx-auto mb-4 text-brand-orange" />
                <p className="font-display text-xl uppercase">Ничего не найдено</p>
                <button onClick={resetAll} className="mt-3 text-brand-orange hover:underline">Сбросить фильтры</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <article key={p.id} className="group border-2 border-brand-ink bg-card hover-scale">
                    <div className="relative overflow-hidden aspect-[4/5]">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {p.tag && (
                        <span className="absolute top-3 left-3 bg-brand-lime px-3 py-1 font-display text-xs uppercase tracking-wide text-brand-ink">
                          {p.tag}
                        </span>
                      )}
                      <button className="absolute bottom-3 right-3 w-11 h-11 grid place-items-center bg-brand-ink text-background opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-orange">
                        <Icon name="Plus" size={20} />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-wide text-brand-ink/50">{p.type}</p>
                      <h3 className="font-display text-xl uppercase mt-1">{p.name}</h3>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-display text-lg">{p.price.toLocaleString('ru')} ₽</span>
                        <span className="flex gap-1">
                          {p.sizes.slice(0, 4).map((s) => (
                            <span key={s} className="text-[11px] text-brand-ink/50">{s}</span>
                          ))}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About brand */}
      <section id="О бренде" className="bg-brand-ink text-background py-20 md:py-28">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-display text-sm uppercase tracking-widest text-brand-lime">О бренде</span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-700 uppercase leading-[0.95]">
              Мы сделали спецодежду <span className="text-brand-orange">желанной</span>
            </h2>
            <p className="mt-6 text-background/70 text-lg max-w-lg">
              FORMA — это про уважение к тем, кто работает руками. Мы соединили промышленную надёжность с дизайном, который раньше встречался только на подиумах.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              {[['Износостойко', 'Ripstop'], ['Сертифицировано', 'ГОСТ'], ['Эко-крой', 'Без отходов']].map(([t, s]) => (
                <div key={t} className="border-l-2 border-brand-lime pl-4">
                  <div className="font-display text-lg uppercase">{t}</div>
                  <div className="text-background/50 text-sm">{s}</div>
                </div>
              ))}
            </div>
          </div>
          <div id="Портфолио" className="grid grid-cols-2 gap-4">
            <img src={IMG.teal} alt="Модель" className="w-full aspect-[3/4] object-cover translate-y-6" />
            <img src={IMG.magenta} alt="Модель" className="w-full aspect-[3/4] object-cover" />
          </div>
        </div>
      </section>

      {/* Shorts collection */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 bg-brand-lime px-4 py-1.5 font-display text-xs uppercase tracking-widest text-brand-ink mb-4">
              Летняя линейка
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-700 uppercase">Короткие шорты</h2>
          </div>
          <p className="text-brand-ink/60 max-w-sm">Латексные шорты для работы в жару — облегающий крой, яркие цвета, plus size от S до 5XL.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { img: IMG.shortsOrange, name: 'Шорты HEAT', color: 'Оранжевый', price: 3490, tag: 'Хит лета' },
            { img: IMG.shortsTeal, name: 'Шорты COOL', color: 'Бирюза', price: 3290, tag: 'Новинка' },
          ].map((p) => (
            <article key={p.name} className="group border-2 border-brand-ink bg-card hover-scale">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 bg-brand-lime px-3 py-1 font-display text-xs uppercase tracking-wide text-brand-ink">
                  {p.tag}
                </span>
                <button className="absolute bottom-3 right-3 w-11 h-11 grid place-items-center bg-brand-ink text-background opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-orange">
                  <Icon name="Plus" size={20} />
                </button>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-brand-ink/50">Шорты • {p.color}</p>
                  <h3 className="font-display text-2xl uppercase mt-1">{p.name}</h3>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl">{p.price.toLocaleString('ru')} ₽</div>
                  <div className="text-xs text-brand-ink/50 mt-1">S — 5XL</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Delivery */}
      <section id="Доставка" className="container py-16 md:py-24">
        <h2 className="font-display text-4xl md:text-6xl font-700 uppercase mb-10">Доставка и оплата</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: 'Truck', title: 'Доставка по РФ', text: 'СДЭК и Почта России. Бесплатно от 5 000 ₽, обычно 2–5 дней.' },
            { icon: 'CreditCard', title: 'Удобная оплата', text: 'Картой онлайн, по счёту для юрлиц или при получении.' },
            { icon: 'Package', title: 'Корпоративно', text: 'Брендирование, опт от 10 шт и персональный менеджер.' },
          ].map((c) => (
            <div key={c.title} className="border-2 border-brand-ink p-7 bg-card hover:bg-brand-lime transition-colors">
              <Icon name={c.icon} size={32} className="text-brand-orange" />
              <h3 className="mt-4 font-display text-xl uppercase">{c.title}</h3>
              <p className="mt-2 text-brand-ink/70">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="Отзывы" className="bg-brand-orange py-16 md:py-24">
        <div className="container">
          <h2 className="font-display text-4xl md:text-6xl font-700 uppercase text-background mb-10">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-background border-2 border-brand-ink p-6">
                <div className="flex gap-1 text-brand-orange mb-3">
                  {[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={16} fallback="Star" />)}
                </div>
                <p className="text-brand-ink/80">«{r.text}»</p>
                <div className="mt-5 pt-4 border-t-2 border-brand-ink">
                  <div className="font-display uppercase">{r.name}</div>
                  <div className="text-sm text-brand-ink/50">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="Блог" className="container py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-4xl md:text-6xl font-700 uppercase">Блог</h2>
          <a href="#Блог" className="font-display uppercase text-sm text-brand-orange hover:underline">Все статьи →</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG.map((b) => (
            <article key={b.title} className="group border-2 border-brand-ink p-6 bg-card hover-scale cursor-pointer">
              <span className="inline-block bg-brand-lime px-3 py-1 font-display text-xs uppercase tracking-wide">{b.tag}</span>
              <h3 className="mt-4 font-display text-2xl uppercase leading-tight group-hover:text-brand-orange transition-colors">{b.title}</h3>
              <p className="mt-6 text-sm text-brand-ink/50 flex items-center gap-2">
                <Icon name="Clock" size={14} /> {b.read} чтения
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Contacts / Footer */}
      <footer id="Контакты" className="bg-brand-ink text-background py-16">
        <div className="container grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-display text-3xl font-700">FORMA<span className="text-brand-orange">.</span></div>
            <p className="mt-4 text-background/60 max-w-xs">Спецодежда нового поколения. Работаем по всей России с 2018 года.</p>
          </div>
          <div>
            <p className="font-display uppercase tracking-wide mb-4 text-brand-lime">Контакты</p>
            <ul className="space-y-2 text-background/70">
              <li className="flex items-center gap-2"><Icon name="Phone" size={16} /> 8 800 555-35-35</li>
              <li className="flex items-center gap-2"><Icon name="Mail" size={16} /> hello@forma.ru</li>
              <li className="flex items-center gap-2"><Icon name="MapPin" size={16} /> Москва, ул. Промышленная, 12</li>
            </ul>
          </div>
          <div>
            <p className="font-display uppercase tracking-wide mb-4 text-brand-lime">Рассылка</p>
            <p className="text-background/60 mb-3">Скидка 10% на первый заказ</p>
            <div className="flex">
              <input placeholder="E-mail" className="flex-1 bg-transparent border-2 border-background/30 px-4 py-2 text-background placeholder:text-background/40 focus:outline-none focus:border-brand-lime" />
              <Button className="rounded-none bg-brand-orange text-background font-display uppercase hover:bg-brand-lime hover:text-brand-ink">OK</Button>
            </div>
          </div>
        </div>
        <div className="container mt-12 pt-6 border-t border-background/20 text-sm text-background/40">
          © 2026 FORMA. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default Index;