
export interface Star {
  id: number;
  name: string;
  x: number;
  y: number;
  isPrimary: boolean;
  constellationId: number;
}

export interface Constellation {
  id: number;
  name: string;
  stars: Star[];
  lines: [number, number][]; // Pairs of star IDs
  type?: 'chinese' | 'zodiac';
}

export const constellations: Constellation[] = [
  {
    id: 1,
    name: '北斗七星 (Ursa Major)',
    type: 'chinese',
    stars: [
      { id: 101, name: '天枢', x: 85, y: 65, isPrimary: true, constellationId: 1 },
      { id: 102, name: '天璇', x: 70, y: 58, isPrimary: true, constellationId: 1 },
      { id: 103, name: '天玑', x: 58, y: 64, isPrimary: true, constellationId: 1 },
      { id: 104, name: '天权', x: 45, y: 55, isPrimary: true, constellationId: 1 },
      { id: 105, name: '玉衡', x: 30, y: 40, isPrimary: true, constellationId: 1 },
      { id: 106, name: '开阳', x: 18, y: 28, isPrimary: true, constellationId: 1 },
      { id: 107, name: '瑶光', x: 10, y: 15, isPrimary: true, constellationId: 1 },
    ],
    lines: [
      [101, 102], [102, 103], [103, 104], [104, 105], [105, 106], [106, 107]
    ],
  },
  {
    id: 2,
    name: '仙后座 (Cassiopeia)',
    type: 'chinese',
    stars: [
      { id: 201, name: '王良一', x: 20, y: 80, isPrimary: true, constellationId: 2 },
      { id: 202, name: '王良四', x: 35, y: 88, isPrimary: true, constellationId: 2 },
      { id: 203, name: '策', x: 50, y: 82, isPrimary: true, constellationId: 2 },
      { id: 204, name: '阁道三', x: 65, y: 90, isPrimary: true, constellationId: 2 },
      { id: 205, name: '阁道二', x: 80, y: 83, isPrimary: true, constellationId: 2 },
    ],
    lines: [
      [201, 202], [202, 203], [203, 204], [204, 205]
    ],
  },
  {
    id: 3,
    name: '猎户座 (Orion)',
    type: 'chinese',
    stars: [
        { id: 301, name: '参宿四', x: 80, y: 10, isPrimary: true, constellationId: 3 },
        { id: 302, name: '参宿五', x: 60, y: 15, isPrimary: true, constellationId: 3 },
        { id: 303, name: '参宿一', x: 48, y: 28, isPrimary: false, constellationId: 3 },
        { id: 304, name: '参宿二', x: 53, y: 35, isPrimary: false, constellationId: 3 },
        { id: 305, name: '参宿三', x: 58, y: 42, isPrimary: false, constellationId: 3 },
        { id: 306, name: '参宿六', x: 40, y: 45, isPrimary: true, constellationId: 3 },
        { id: 307, name: '参宿七', x: 75, y: 48, isPrimary: true, constellationId: 3 },
    ],
    lines: [
        [301, 302], [302, 307], [307, 305], [305, 304], [304, 303], [303, 306], [306, 302]
    ]
  },
  // Zodiac Constellations
  {
    id: 13,
    name: '白羊座 (Aries)',
    type: 'zodiac',
    stars: [
      { id: 1301, name: '娄宿三', x: 50, y: 30, isPrimary: true, constellationId: 13 },
      { id: 1302, name: '娄宿一', x: 40, y: 45, isPrimary: false, constellationId: 13 },
      { id: 1303, name: '胃宿三', x: 60, y: 40, isPrimary: false, constellationId: 13 },
      { id: 1304, name: '胃宿一', x: 70, y: 55, isPrimary: true, constellationId: 13 },
    ],
    lines: [[1301, 1302], [1301, 1303], [1303, 1304]],
  },
  {
    id: 14,
    name: '金牛座 (Taurus)',
    type: 'zodiac',
    stars: [
      { id: 1401, name: '毕宿五', x: 30, y: 50, isPrimary: true, constellationId: 14 },
      { id: 1402, name: '毕宿一', x: 40, y: 35, isPrimary: false, constellationId: 14 },
      { id: 1403, name: '毕宿星团', x: 55, y: 40, isPrimary: false, constellationId: 14 },
      { id: 1404, name: '五车五', x: 65, y: 25, isPrimary: true, constellationId: 14 },
      { id: 1405, name: '天关', x: 75, y: 60, isPrimary: false, constellationId: 14 },
    ],
    lines: [[1401, 1402], [1402, 1403], [1403, 1404], [1403, 1405]],
  },
  {
    id: 15,
    name: '双子座 (Gemini)',
    type: 'zodiac',
    stars: [
      { id: 1501, name: '北河三', x: 40, y: 20, isPrimary: true, constellationId: 15 },
      { id: 1502, name: '北河二', x: 35, y: 35, isPrimary: true, constellationId: 15 },
      { id: 1503, name: '井宿一', x: 45, y: 70, isPrimary: false, constellationId: 15 },
      { id: 1504, name: '井宿七', x: 60, y: 25, isPrimary: false, constellationId: 15 },
      { id: 1505, name: '井宿三', x: 55, y: 40, isPrimary: false, constellationId: 15 },
      { id: 1506, name: '井宿五', x: 65, y: 75, isPrimary: false, constellationId: 15 },
    ],
    lines: [[1501, 1503], [1502, 1505], [1504, 1506], [1501, 1504], [1502, 1501]],
  },
  {
    id: 16,
    name: '巨蟹座 (Cancer)',
    type: 'zodiac',
    stars: [
      { id: 1601, name: '柳宿增十', x: 50, y: 50, isPrimary: true, constellationId: 16 },
      { id: 1602, name: '鬼宿三', x: 40, y: 40, isPrimary: false, constellationId: 16 },
      { id: 1603, name: '鬼宿四', x: 60, y: 40, isPrimary: false, constellationId: 16 },
      { id: 1604, name: '柳宿增三', x: 45, y: 65, isPrimary: true, constellationId: 16 },
    ],
    lines: [[1601, 1602], [1601, 1603], [1602, 1604], [1603, 1604]],
  },
  {
    id: 17,
    name: '狮子座 (Leo)',
    type: 'zodiac',
    stars: [
      { id: 1701, name: '轩辕十四', x: 70, y: 60, isPrimary: true, constellationId: 17 },
      { id: 1702, name: '轩辕十三', x: 60, y: 45, isPrimary: false, constellationId: 17 },
      { id: 1703, name: '轩辕十二', x: 50, y: 30, isPrimary: false, constellationId: 17 },
      { id: 1704, name: '轩辕十一', x: 40, y: 40, isPrimary: false, constellationId: 17 },
      { id: 1705, name: '五帝座一', x: 30, y: 70, isPrimary: true, constellationId: 17 },
    ],
    lines: [[1701, 1702], [1702, 1703], [1703, 1704], [1704, 1702], [1701, 1705]],
  },
  {
    id: 18,
    name: '处女座 (Virgo)',
    type: 'zodiac',
    stars: [
      { id: 1801, name: '角宿一', x: 40, y: 80, isPrimary: true, constellationId: 18 },
      { id: 1802, name: '太微右垣五', x: 55, y: 65, isPrimary: false, constellationId: 18 },
      { id: 1803, name: '太微左垣一', x: 65, y: 50, isPrimary: true, constellationId: 18 },
      { id: 1804, name: '太微左垣四', x: 75, y: 35, isPrimary: false, constellationId: 18 },
      { id: 1805, name: '亢宿二', x: 30, y: 60, isPrimary: false, constellationId: 18 },
    ],
    lines: [[1801, 1802], [1802, 1803], [1803, 1804], [1801, 1805]],
  },
  {
    id: 19,
    name: '天秤座 (Libra)',
    type: 'zodiac',
    stars: [
      { id: 1901, name: '氐宿增七', x: 30, y: 30, isPrimary: true, constellationId: 19 },
      { id: 1902, name: '氐宿四', x: 70, y: 35, isPrimary: true, constellationId: 19 },
      { id: 1903, name: '氐宿一', x: 40, y: 70, isPrimary: false, constellationId: 19 },
      { id: 1904, name: '氐宿三', x: 60, y: 75, isPrimary: false, constellationId: 19 },
    ],
    lines: [[1901, 1902], [1902, 1904], [1904, 1903], [1903, 1901]],
  },
  {
    id: 20,
    name: '天蝎座 (Scorpio)',
    type: 'zodiac',
    stars: [
      { id: 2001, name: '心宿二', x: 50, y: 50, isPrimary: true, constellationId: 20 },
      { id: 2002, name: '心宿一', x: 40, y: 35, isPrimary: false, constellationId: 20 },
      { id: 2003, name: '心宿三', x: 60, y: 35, isPrimary: false, constellationId: 20 },
      { id: 2004, name: '尾宿八', x: 70, y: 70, isPrimary: true, constellationId: 20 },
      { id: 2005, name: '尾宿五', x: 60, y: 80, isPrimary: false, constellationId: 20 },
    ],
    lines: [[2001, 2002], [2001, 2003], [2001, 2004], [2004, 2005]],
  },
  {
    id: 21,
    name: '射手座 (Sagittarius)',
    type: 'zodiac',
    stars: [
      { id: 2101, name: '箕宿三', x: 50, y: 60, isPrimary: true, constellationId: 21 },
      { id: 2102, name: '箕宿二', x: 40, y: 50, isPrimary: false, constellationId: 21 },
      { id: 2103, name: '斗宿六', x: 60, y: 40, isPrimary: false, constellationId: 21 },
      { id: 2104, name: '斗宿二', x: 70, y: 55, isPrimary: false, constellationId: 21 },
      { id: 2105, name: '天渊三', x: 80, y: 30, isPrimary: true, constellationId: 21 },
    ],
    lines: [[2101, 2102], [2101, 2103], [2103, 2104], [2103, 2105]],
  },
  {
    id: 22,
    name: '摩羯座 (Capricorn)',
    type: 'zodiac',
    stars: [
      { id: 2201, name: '牛宿二', x: 30, y: 70, isPrimary: true, constellationId: 22 },
      { id: 2202, name: '牛宿一', x: 45, y: 55, isPrimary: false, constellationId: 22 },
      { id: 2203, name: '垒壁阵四', x: 70, y: 60, isPrimary: true, constellationId: 22 },
      { id: 2204, name: '垒壁阵二', x: 60, y: 40, isPrimary: false, constellationId: 22 },
    ],
    lines: [[2201, 2202], [2202, 2204], [2204, 2203]],
  },
  {
    id: 23,
    name: '水瓶座 (Aquarius)',
    type: 'zodiac',
    stars: [
      { id: 2301, name: '虚宿一', x: 40, y: 30, isPrimary: true, constellationId: 23 },
      { id: 2302, name: '危宿一', x: 60, y: 25, isPrimary: false, constellationId: 23 },
      { id: 2303, name: '羽林军二十六', x: 50, y: 70, isPrimary: true, constellationId: 23 },
      { id: 2304, name: '羽林军四十五', x: 75, y: 65, isPrimary: false, constellationId: 23 },
    ],
    lines: [[2301, 2302], [2301, 2303], [2303, 2304]],
  },
  {
    id: 24,
    name: '双鱼座 (Pisces)',
    type: 'zodiac',
    stars: [
      { id: 2401, name: '右更二', x: 20, y: 50, isPrimary: true, constellationId: 24 },
      { id: 2402, name: '右更三', x: 35, y: 40, isPrimary: false, constellationId: 24 },
      { id: 2403, name: '奎宿九', x: 80, y: 60, isPrimary: true, constellationId: 24 },
      { id: 2404, name: '奎宿五', x: 65, y: 70, isPrimary: false, constellationId: 24 },
      { id: 2405, name: '外屏七', x: 50, y: 55, isPrimary: false, constellationId: 24 },
    ],
    lines: [[2401, 2402], [2402, 2405], [2405, 2404], [2404, 2403]],
  },
];
