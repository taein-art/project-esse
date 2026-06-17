// ===== STATE =====
const AppState = {
  boards: [],
  posts: [],
  comments: [],
  currentView: 'home',
  currentBoardId: null,
  currentPostId: null,
  sortBy: 'latest',
  currentPage: 1,
  postsPerPage: 20,
};

// ===== BOARDS =====
const BOARDS = [
  { id: 'general',  name: '자유게시판', icon: '💬', desc: '무엇이든 자유롭게 이야기하세요' },
  { id: 'humor',    name: '유머',       icon: '😂', desc: '웃긴 이야기와 짤방을 공유해요' },
  { id: 'news',     name: '뉴스',       icon: '📰', desc: '오늘의 뉴스와 이슈를 공유해요' },
  { id: 'politics', name: '정치',       icon: '🏛️', desc: '정치 이야기, 서로 존중하며 토론해요' },
  { id: 'sports',   name: '스포츠',     icon: '⚽', desc: '스포츠 소식과 응원' },
  { id: 'gaming',   name: '게임',       icon: '🎮', desc: '게임 이야기 무엇이든' },
  { id: 'food',     name: '맛집/음식',  icon: '🍜', desc: '맛집 추천과 음식 이야기' },
  { id: 'travel',   name: '여행',       icon: '✈️', desc: '여행 정보와 후기' },
];

// ===== SEED DATA (Hacker News 실제 글, 관리자 계정으로 등록) =====
const ADMIN_ID = 'admin_tkrhd7172';
const HN_SEED = [
  { id:'hn1',  boardId:'news',    title:'SpaceX to buy Cursor for $60B',                             content:'🔗 원문: https://www.reuters.com/legal/transactional/spacex-buy-anysphere-60-billion-2026-06-16/\n\nSpaceX가 AI 코드 에디터 Cursor(Anysphere)를 600억 달러에 인수한다고 로이터가 보도했습니다.\n\n[Hacker News] 추천 1,010점 · 댓글 1,505개 · by itsmarcelg', author:'관리자', authorId:ADMIN_ID, upvotes:1010, downvotes:12, views:8921, createdAt:1781606664000, commentCount:0, images:[], video:'' },
  { id:'hn2',  boardId:'general', title:'Running local models is good now',                          content:'🔗 원문: https://vickiboykis.com/2026/06/15/running-local-models-is-good-now/\n\n로컬 AI 모델 실행이 이제 충분히 실용적인 수준에 도달했다는 내용의 글. 하드웨어 발전과 모델 경량화 덕분에 개인 PC에서도 쓸 만한 LLM을 돌릴 수 있게 되었다고 합니다.\n\n[Hacker News] 추천 1,282점 · 댓글 498개 · by jfb', author:'관리자', authorId:ADMIN_ID, upvotes:1282, downvotes:8,  views:6231, createdAt:1781620617000, commentCount:0, images:[], video:'' },
  { id:'hn3',  boardId:'news',    title:'GrapheneOS has been ported to Android 17',                  content:'🔗 원문: https://discuss.grapheneos.org/d/36469-grapheneos-has-been-ported-to-android-17-and-official-releases-are-coming-soon\n\n프라이버시 중심 안드로이드 OS인 GrapheneOS가 Android 17로 포팅되었으며 공식 릴리즈가 곧 출시될 예정입니다.\n\n[Hacker News] 추천 726점 · 댓글 329개 · by Cider9986', author:'관리자', authorId:ADMIN_ID, upvotes:726,  downvotes:5,  views:4102, createdAt:1781642075000, commentCount:0, images:[], video:'' },
  { id:'hn4',  boardId:'general', title:'Stop Using JWTs',                                           content:'🔗 원문: https://gist.github.com/samsch/0d1f3d3b4745d778f78b230cf6061452\n\nJWT(JSON Web Token)의 흔한 오용 사례와 더 나은 대안을 설명하는 글. 세션 기반 인증이 많은 경우 더 적합하다는 주장.\n\n[Hacker News] 추천 370점 · 댓글 212개 · by dzonga', author:'관리자', authorId:ADMIN_ID, upvotes:370,  downvotes:9,  views:3841, createdAt:1781628586000, commentCount:0, images:[], video:'' },
  { id:'hn5',  boardId:'general', title:'TIL: You can make HTTP requests without curl using Bash /dev/TCP', content:'🔗 원문: https://mareksuppa.com/til/bash-dev-tcp-http-without-curl/\n\nBash의 /dev/tcp 가상 파일 시스템을 이용해 curl 없이 순수 bash만으로 HTTP 요청을 보낼 수 있다는 팁.\n\n[Hacker News] 추천 399점 · 댓글 187개 · by mrshu', author:'관리자', authorId:ADMIN_ID, upvotes:399,  downvotes:4,  views:3210, createdAt:1781628058000, commentCount:0, images:[], video:'' },
  { id:'hn6',  boardId:'humor',   title:'Calvin and Hobbes and the price of integrity',               content:'🔗 원문: https://therepublicofletters.substack.com/p/calvin-and-hobbes-and-the-price-of\n\n만화가 Bill Watterson이 Calvin and Hobbes 연재를 종료하면서 지킨 원칙들을 돌아보는 에세이. 상업화 압력을 거부하며 작품의 순수성을 지킨 그의 결정에 대한 이야기.\n\n[Hacker News] 추천 406점 · 댓글 176개 · by pseudolus', author:'관리자', authorId:ADMIN_ID, upvotes:406,  downvotes:3,  views:2987, createdAt:1781624684000, commentCount:0, images:[], video:'' },
  { id:'hn7',  boardId:'general', title:'Has AI already killed self-help nonfiction books?',          content:'🔗 원문: https://tim.blog/2026/06/12/has-ai-already-killed-nonfiction/\n\nAI 챗봇이 자기계발서를 대체하고 있는지 논하는 글. 맞춤형 조언을 즉시 제공하는 AI vs. 깊이 있는 사유를 담은 책, 어느 쪽이 더 가치 있을까?\n\n[Hacker News] 추천 280점 · 댓글 308개 · by imakwana', author:'관리자', authorId:ADMIN_ID, upvotes:280,  downvotes:11, views:2541, createdAt:1781629865000, commentCount:0, images:[], video:'' },
  { id:'hn8',  boardId:'gaming',  title:"Stop Killing Games fails to secure EU law despite 1.3M signatures", content:'🔗 원문: https://www.dexerto.com/gaming/stop-killing-games-fails-to-secure-eu-law-despite-1-3m-signatures-3376431/\n\n130만 명이 서명한 "Stop Killing Games" 청원이 EU 법제화에 실패했습니다. 게임사가 서버를 종료하면 플레이 불가능해지는 문제를 규제하려는 시도였으나 의회 문턱을 넘지 못했습니다.\n\n[Hacker News] 추천 204점 · 댓글 102개 · by slymax', author:'관리자', authorId:ADMIN_ID, upvotes:204,  downvotes:7,  views:2103, createdAt:1781660422000, commentCount:0, images:[], video:'' },
  { id:'hn9',  boardId:'humor',   title:'But yak shaving is fun (2019)',                              content:'🔗 원문: https://parksb.github.io/en/article/32.html\n\n"야크 털 깎기(Yak Shaving)" — 본래 목표와 무관해 보이는 사전 작업들을 계속 하게 되는 현상. 하지만 저자는 이 과정 자체가 즐겁고 의미 있다고 주장합니다.\n\n[Hacker News] 추천 257점 · 댓글 73개 · by parksb', author:'관리자', authorId:ADMIN_ID, upvotes:257,  downvotes:2,  views:1987, createdAt:1781619986000, commentCount:0, images:[], video:'' },
  { id:'hn10', boardId:'news',    title:'GPT-NL: a sovereign language model for the Netherlands',    content:'🔗 원문: https://www.tno.nl/en/digital/artificial-intelligence/gpt-nl/\n\n네덜란드 정부 주도로 개발된 자국어 주권 AI 언어 모델 GPT-NL. 데이터 주권과 개인정보 보호를 위해 자국 인프라에서 운영됩니다.\n\n[Hacker News] 추천 206점 · 댓글 202개 · by root-parent', author:'관리자', authorId:ADMIN_ID, upvotes:206,  downvotes:6,  views:1654, createdAt:1781632442000, commentCount:0, images:[], video:'' },
  { id:'hn11', boardId:'travel',  title:'The Amphibious Villagers of Indonesia',                     content:'🔗 원문: https://www.economist.com/interactive/1843/2026/06/12/the-amphibious-villagers-of-indonesia\n\n인도네시아 바다 위에 집을 짓고 살아가는 바자우(Bajau) 부족의 삶을 담은 인터랙티브 기사. 세계 최고의 자유 다이버로도 유명한 이들의 독특한 수상 생활을 소개합니다.\n\n[Hacker News] 추천 25점 · 댓글 4개 · by haritha-j', author:'관리자', authorId:ADMIN_ID, upvotes:25,   downvotes:1,  views:891,  createdAt:1781445304000, commentCount:0, images:[], video:'' },
  { id:'hn12', boardId:'news',    title:'Subterranean fungi networks more than 100 quadrillion km in length', content:'🔗 원문: https://www.theguardian.com/science/2026/jun/11/arbuscular-mycorrhizal-fungi-plant-life-climate-global-mapping-study\n\n지구 지하에 뻗어 있는 균류 네트워크의 총 길이가 100경(京) km를 넘는다는 새 연구 결과. 기후 조절과 식물 생태계 유지에 핵심적인 역할을 한다고 합니다.\n\n[Hacker News] 추천 51점 · 댓글 7개 · by tosh', author:'관리자', authorId:ADMIN_ID, upvotes:51,   downvotes:2,  views:743,  createdAt:1781211071000, commentCount:0, images:[], video:'' },
  { id:'hn13', boardId:'general', title:'Wolfram Language and Mathematica version 15',               content:'🔗 원문: https://writings.stephenwolfram.com/2026/06/launching-version-15-of-wolfram-language-mathematica-built-in-useful-ai-lots-of-new-core-functionality/\n\nStephen Wolfram이 Wolfram Language & Mathematica 15 버전 출시를 발표. AI 기능 내장과 다수의 핵심 기능 강화가 주요 내용입니다.\n\n[Hacker News] 추천 159점 · 댓글 78개 · by alok-g', author:'관리자', authorId:ADMIN_ID, upvotes:159,  downvotes:4,  views:1243, createdAt:1781651744000, commentCount:0, images:[], video:'' },
  { id:'hn14', boardId:'general', title:'The founder\'s playbook: Building an AI-native startup',    content:'🔗 원문: https://claude.com/blog/the-founders-playbook\n\nAI 네이티브 스타트업을 구축하는 방법에 대한 Anthropic의 가이드. AI를 핵심 아키텍처로 삼는 스타트업의 특성과 전략을 설명합니다.\n\n[Hacker News] 추천 56점 · 댓글 53개 · by e2e4', author:'관리자', authorId:ADMIN_ID, upvotes:56,   downvotes:3,  views:892,  createdAt:1781679882000, commentCount:0, images:[], video:'' },
  { id:'hn15', boardId:'general', title:'A brief tour of the PDP-11, the most influential minicomputer of all time', content:'🔗 원문: https://arstechnica.com/gadgets/2022/03/a-brief-tour-of-the-pdp-11-the-most-influential-minicomputer-of-all-time/\n\nDEC의 PDP-11이 현대 컴퓨팅에 미친 영향을 돌아보는 글. Unix, C언어, 인터럽트 기반 I/O 등 오늘날 우리가 당연하게 여기는 개념들의 뿌리가 여기에 있습니다.\n\n[Hacker News] 추천 75점 · 댓글 30개 · by jensgk', author:'관리자', authorId:ADMIN_ID, upvotes:75,   downvotes:1,  views:641,  createdAt:1781498262000, commentCount:0, images:[], video:'' },
];

// ===== STORAGE =====
const S = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k)    { try { localStorage.removeItem(k); } catch {} },
};

// ===== UTILS =====
function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }

function simpleHash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) + h) ^ str.charCodeAt(i); h = h >>> 0; }
  return h.toString(16);
}

function timeAgo(ts) {
  const d = Date.now() - ts, m = Math.floor(d/60000), h = Math.floor(d/3600000), days = Math.floor(d/86400000);
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  if (h < 24) return `${h}시간 전`;
  if (days < 30) return `${days}일 전`;
  return new Date(ts).toLocaleDateString('ko-KR');
}

function esc(s) { const d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 2500);
}

function compressImage(file, maxW = 1200, quality = 0.75) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function parseVideoUrl(url) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?#]+)/);
  if (yt) return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${yt[1]}?rel=0` };
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { type: 'direct', url };
  return null;
}

// ===== AUTH =====
const Auth = {
  current: null,

  init() {
    this.current = S.get('session', null);
    this._ensureAdmin();
  },

  _ensureAdmin() {
    const users = S.get('users', []);
    if (!users.find(u => u.username === 'tkrhd7172')) {
      users.unshift({
        id: 'admin_tkrhd7172',
        username: 'tkrhd7172',
        nickname: '관리자',
        password: simpleHash('admin1234'),
        role: 'admin',
        createdAt: Date.now(),
        isBanned: false,
      });
      S.set('users', users);
    }
  },

  login(username, password) {
    const users = S.get('users', []);
    const u = users.find(x => x.username === username);
    if (!u || u.password !== simpleHash(password)) return { ok: false, msg: '아이디 또는 비밀번호가 올바르지 않습니다.' };
    if (u.isBanned) return { ok: false, msg: '차단된 계정입니다. 관리자에게 문의하세요.' };
    this.current = { id: u.id, username: u.username, nickname: u.nickname, role: u.role };
    S.set('session', this.current);
    return { ok: true };
  },

  signup(username, nickname, password, password2) {
    if (!/^[a-zA-Z0-9_]{4,20}$/.test(username)) return { ok: false, msg: '아이디는 영문, 숫자, 밑줄 4~20자여야 합니다.' };
    if (nickname.length < 2 || nickname.length > 20) return { ok: false, msg: '닉네임은 2~20자여야 합니다.' };
    if (password.length < 6) return { ok: false, msg: '비밀번호는 6자 이상이어야 합니다.' };
    if (password !== password2) return { ok: false, msg: '비밀번호가 일치하지 않습니다.' };
    const users = S.get('users', []);
    if (users.find(u => u.username === username)) return { ok: false, msg: '이미 사용 중인 아이디입니다.' };
    if (users.find(u => u.nickname === nickname)) return { ok: false, msg: '이미 사용 중인 닉네임입니다.' };
    const newUser = { id: genId(), username, nickname, password: simpleHash(password), role: 'member', createdAt: Date.now(), isBanned: false };
    users.push(newUser);
    S.set('users', users);
    this.current = { id: newUser.id, username: newUser.username, nickname: newUser.nickname, role: newUser.role };
    S.set('session', this.current);
    return { ok: true };
  },

  logout() { this.current = null; S.del('session'); },

  isAdmin() { return this.current?.role === 'admin'; },
  isLoggedIn() { return !!this.current; },

  getUsers() { return S.get('users', []); },

  banUser(userId) {
    const users = S.get('users', []);
    const u = users.find(x => x.id === userId);
    if (u && u.role !== 'admin') { u.isBanned = true; S.set('users', users); return true; }
    return false;
  },

  unbanUser(userId) {
    const users = S.get('users', []);
    const u = users.find(x => x.id === userId);
    if (u) { u.isBanned = false; S.set('users', users); return true; }
    return false;
  },

  deleteUser(userId) {
    let users = S.get('users', []);
    const u = users.find(x => x.id === userId);
    if (!u || u.role === 'admin') return false;
    users = users.filter(x => x.id !== userId);
    S.set('users', users);
    return true;
  },
};

// ===== DATA =====
const Data = {
  board(id) { return AppState.boards.find(b => b.id === id); },

  posts(boardId, sort, query) {
    let list = [...AppState.posts];
    if (boardId) list = list.filter(p => p.boardId === boardId);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.author.toLowerCase().includes(q));
    }
    if (sort === 'popular') list.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    else if (sort === 'views') list.sort((a, b) => b.views - a.views);
    else list.sort((a, b) => b.createdAt - a.createdAt);
    return list;
  },

  post(id) { return AppState.posts.find(p => p.id === id); },

  comments(postId) {
    return AppState.comments.filter(c => c.postId === postId).sort((a, b) => a.createdAt - b.createdAt);
  },

  addPost(data) {
    const p = { id: genId(), ...data, upvotes: 1, downvotes: 0, views: 0, commentCount: 0, createdAt: Date.now() };
    AppState.posts.unshift(p);
    S.set('posts', AppState.posts);
    return p;
  },

  addComment(data) {
    const c = { id: genId(), ...data, upvotes: 0, createdAt: Date.now() };
    AppState.comments.push(c);
    S.set('comments', AppState.comments);
    const p = Data.post(data.postId);
    if (p) { p.commentCount = (p.commentCount || 0) + 1; S.set('posts', AppState.posts); }
    return c;
  },

  deletePost(postId) {
    AppState.posts = AppState.posts.filter(p => p.id !== postId);
    AppState.comments = AppState.comments.filter(c => c.postId !== postId);
    S.set('posts', AppState.posts);
    S.set('comments', AppState.comments);
  },

  deleteComment(commentId) {
    const c = AppState.comments.find(x => x.id === commentId);
    AppState.comments = AppState.comments.filter(x => x.id !== commentId);
    S.set('comments', AppState.comments);
    if (c) {
      const p = Data.post(c.postId);
      if (p) { p.commentCount = Math.max(0, (p.commentCount || 1) - 1); S.set('posts', AppState.posts); }
    }
  },

  votePost(postId, dir, counts) {
    const p = Data.post(postId); if (!p) return;
    p.upvotes = counts.up; p.downvotes = counts.down;
    S.set('posts', AppState.posts);
    const uv = S.get('uv', {}); uv[`p_${postId}`] = dir; S.set('uv', uv);
  },

  voteComment(id, up) {
    const c = AppState.comments.find(x => x.id === id); if (!c) return;
    c.upvotes = up; S.set('comments', AppState.comments);
    const uv = S.get('uv', {}); uv[`c_${id}`] = true; S.set('uv', uv);
  },

  getVote(type, id) { return S.get('uv', {})[`${type}_${id}`]; },

  incrViews(postId) {
    const p = Data.post(postId);
    if (p) { p.views = (p.views || 0) + 1; S.set('posts', AppState.posts); }
  },

  canDelete(authorId) {
    return Auth.isAdmin() || (Auth.isLoggedIn() && Auth.current.id === authorId);
  },
};

// ===== RENDER HELPERS =====
function postCard(post, showBoard) {
  const board = Data.board(post.boardId);
  const score = post.upvotes - post.downvotes;
  const sc = score > 0 ? 'pos' : score < 0 ? 'neg' : '';
  const uv = Data.getVote('p', post.id);
  const cc = post.commentCount || AppState.comments.filter(c => c.postId === post.id).length;
  const canDel = Data.canDelete(post.authorId);
  return `
    <div class="post-card" data-pid="${post.id}">
      <div class="vote-section">
        <button class="vote-btn${uv==='up'?' voted-up':''}" data-vote="up" data-pid="${post.id}">▲</button>
        <span class="vote-count ${sc}">${score}</span>
        <button class="vote-btn down${uv==='down'?' voted-down':''}" data-vote="down" data-pid="${post.id}">▼</button>
      </div>
      <div class="post-content-area">
        <div class="post-meta">
          ${showBoard && board ? `<a class="board-tag" href="#/b/${board.id}">${board.icon} ${board.name}</a>` : ''}
          <span>${esc(post.author)}</span><span>·</span>
          <span>${timeAgo(post.createdAt)}</span><span>·</span>
          <span>👁 ${post.views||0}</span>
          ${post.images?.length ? `<span class="media-badge">🖼 ${post.images.length}</span>` : ''}
          ${post.video ? `<span class="media-badge">🎬</span>` : ''}
        </div>
        <div class="post-title"><a href="#/p/${post.id}">${esc(post.title)}</a></div>
        ${post.content ? `<div class="post-preview">${esc(post.content)}</div>` : ''}
        ${post.images?.length ? `<img class="post-card-thumb" src="${post.images[0]}" alt="썸네일">` : ''}
        <div class="post-actions">
          <button class="post-action-btn" onclick="event.stopPropagation();Router.go('/p/${post.id}')">💬 댓글 ${cc}</button>
          <button class="post-action-btn" onclick="event.stopPropagation();App.share('${post.id}')">🔗 공유</button>
          ${canDel ? `<button class="post-action-btn danger" onclick="event.stopPropagation();App.deletePost('${post.id}')">🗑 삭제</button>` : ''}
        </div>
      </div>
    </div>`;
}

function commentItem(c) {
  const uv = Data.getVote('c', c.id);
  const canDel = Data.canDelete(c.authorId);
  return `
    <div class="comment-item" id="cm-${c.id}">
      <div class="comment-meta">
        <span class="comment-author">${esc(c.author)}</span>
        <span>${timeAgo(c.createdAt)}</span>
        ${canDel ? `<button class="post-action-btn danger" style="margin-left:auto" data-delcm="${c.id}">🗑 삭제</button>` : ''}
      </div>
      <div class="comment-body">${esc(c.content)}</div>
      <div class="comment-actions">
        <button class="post-action-btn${uv?' voted-up':''}" data-cvote="${c.id}">▲ ${c.upvotes}</button>
      </div>
    </div>`;
}

function renderPostMedia(post) {
  let html = '';
  if (post.images?.length) {
    html += `<div class="post-img-gallery">${post.images.map((src, i) =>
      `<img class="post-img-thumb" src="${src}" alt="첨부 이미지 ${i+1}" onclick="App.openImg('${i}','${post.id}')">`
    ).join('')}</div>`;
  }
  if (post.video) {
    const v = parseVideoUrl(post.video);
    if (v?.type === 'youtube') {
      html += `<div class="post-video-wrap"><iframe src="${v.embedUrl}" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>`;
    } else if (v?.type === 'direct') {
      html += `<div class="post-video-wrap"><video src="${v.url}" controls></video></div>`;
    }
  }
  return html;
}

function sortBar(active) {
  return `<div class="sort-bar">
    <span class="sort-label">정렬:</span>
    <button class="sort-btn${active==='latest'?' active':''}" data-sort="latest">🕐 최신</button>
    <button class="sort-btn${active==='popular'?' active':''}" data-sort="popular">🔥 인기</button>
    <button class="sort-btn${active==='views'?' active':''}" data-sort="views">👁 조회수</button>
  </div>`;
}

function pagination(total, page, per) {
  const pages = Math.ceil(total / per); if (pages <= 1) return '';
  let b = '';
  const s = Math.max(1, page-2), e = Math.min(pages, page+2);
  if (s > 1) b += `<button class="page-btn" data-page="1">1</button>`;
  if (s > 2) b += `<span style="padding:6px 4px;color:var(--text-muted)">…</span>`;
  for (let i = s; i <= e; i++) b += `<button class="page-btn${i===page?' active':''}" data-page="${i}">${i}</button>`;
  if (e < pages-1) b += `<span style="padding:6px 4px;color:var(--text-muted)">…</span>`;
  if (e < pages) b += `<button class="page-btn" data-page="${pages}">${pages}</button>`;
  return `<div class="pagination">${b}</div>`;
}

function postList(posts, showBoard) {
  if (!posts.length) return `
    <div class="empty-state">
      <div class="empty-icon">📭</div>
      <h3>게시글이 없습니다</h3>
      <p>첫 번째 글을 작성해보세요!</p>
      ${Auth.isLoggedIn() ? `<button class="btn-primary" onclick="document.getElementById('writeBtn').click()">글쓰기</button>` : `<button class="btn-primary" onclick="App.showLogin()">로그인 후 글쓰기</button>`}
    </div>`;
  return posts.map(p => postCard(p, showBoard)).join('');
}

// ===== ROUTER =====
const Router = {
  init() { window.addEventListener('hashchange', () => this.route()); this.route(); },
  route() {
    const h = window.location.hash.replace('#', '') || '/';
    AppState.currentPage = 1;
    if (h === '/' || h === '') App.showHome();
    else if (h.startsWith('/b/')) App.showBoard(h.slice(3).split('?')[0]);
    else if (h.startsWith('/p/')) App.showPost(h.slice(3));
    else if (h.startsWith('/write')) { const bid = h.includes('?board=') ? h.split('?board=')[1] : null; App.showWrite(bid); }
    else if (h.startsWith('/search')) { const q = new URLSearchParams(h.split('?')[1]||'').get('q')||''; App.showSearch(q); }
    else if (h === '/admin') App.showAdmin();
  },
  go(path) { window.location.hash = path; },
};

// ===== APP =====
const App = {
  init() {
    Auth.init();
    AppState.boards = BOARDS;

    // 기존 로컬스토리지에서 샘플 데이터 제거
    let storedPosts = S.get('posts', null);
    let storedComments = S.get('comments', null);
    if (storedPosts) {
      storedPosts = storedPosts.filter(p => p.authorId !== 'sample');
      S.set('posts', storedPosts);
    }
    if (storedComments) {
      storedComments = storedComments.filter(c => c.authorId !== 'sample');
      S.set('comments', storedComments);
    }

    // HN 시드 데이터 주입 (관리자 글이 없을 때만)
    const saved = S.get('posts', []);
    const hasAdminContent = saved.some(p => p.authorId === ADMIN_ID);
    if (!hasAdminContent) {
      S.set('posts', [...HN_SEED, ...saved]);
    }

    AppState.posts = S.get('posts', HN_SEED);
    AppState.comments = S.get('comments', []);
    AppState.posts.forEach(p => { p.commentCount = AppState.comments.filter(c => c.postId === p.id).length; });
    this.renderSidebar();
    this.bindGlobal();
    this.updateUserUI();
    Router.init();
  },

  renderSidebar() {
    document.getElementById('boardNav').innerHTML =
      `<a class="sidebar-board-item" href="#/"><span class="board-icon">🏠</span> 전체</a>` +
      AppState.boards.map(b =>
        `<a class="sidebar-board-item" href="#/b/${b.id}"><span class="board-icon">${b.icon}</span> ${esc(b.name)}</a>`
      ).join('');
    const adminLink = document.getElementById('adminSidebarLink');
    if (Auth.isAdmin()) {
      adminLink.innerHTML = `<div class="sidebar-divider"></div><a class="sidebar-board-item admin-link" href="#/admin"><span class="board-icon">👑</span> 관리자 패널</a>`;
    } else {
      adminLink.innerHTML = '';
    }
  },

  setSidebarActive(boardId, isAdmin) {
    document.querySelectorAll('.sidebar-board-item').forEach(el => {
      const href = el.getAttribute('href');
      if (isAdmin) el.classList.toggle('active', href === '#/admin');
      else if (!boardId) el.classList.toggle('active', href === '#/');
      else el.classList.toggle('active', href === `#/b/${boardId}`);
    });
  },

  updateUserUI() {
    const sec = document.getElementById('userSection');
    if (Auth.isLoggedIn()) {
      const isAdm = Auth.isAdmin();
      sec.innerHTML = `
        <span class="user-badge ${isAdm ? 'badge-admin' : ''}">
          ${isAdm ? '👑' : '👤'} ${esc(Auth.current.nickname)}
          ${isAdm ? '<span class="badge badge-admin-pill" style="margin-left:4px">관리자</span>' : ''}
        </span>
        ${isAdm ? `<button class="btn-ghost" onclick="Router.go('/admin')">관리자 패널</button>` : ''}
        <button class="btn-ghost" id="logoutBtn">로그아웃</button>
        <button class="btn-primary" id="writeBtn">✏️ 글쓰기</button>`;
      document.getElementById('logoutBtn').addEventListener('click', () => this.doLogout());
      document.getElementById('writeBtn').addEventListener('click', () => {
        Router.go('/write' + (AppState.currentBoardId ? `?board=${AppState.currentBoardId}` : ''));
      });
    } else {
      sec.innerHTML = `
        <button class="btn-outline" id="loginBtnHeader">로그인</button>
        <button class="btn-primary" id="signupBtnHeader">회원가입</button>`;
      document.getElementById('loginBtnHeader').addEventListener('click', () => this.showLogin());
      document.getElementById('signupBtnHeader').addEventListener('click', () => this.showSignup());
    }
    this.renderSidebar();
  },

  bindGlobal() {
    document.getElementById('menuBtn').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('overlay').classList.toggle('active');
    });
    document.getElementById('overlay').addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('active');
    });
    document.getElementById('searchBtn').addEventListener('click', () => this.doSearch());
    document.getElementById('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') this.doSearch(); });

    // Login modal
    document.getElementById('loginClose').addEventListener('click', () => this.hideLogin());
    document.getElementById('loginSubmit').addEventListener('click', () => this.doLogin());
    document.getElementById('loginPassword').addEventListener('keydown', e => { if (e.key === 'Enter') this.doLogin(); });
    document.getElementById('goSignup').addEventListener('click', () => { this.hideLogin(); this.showSignup(); });

    // Signup modal
    document.getElementById('signupClose').addEventListener('click', () => this.hideSignup());
    document.getElementById('signupSubmit').addEventListener('click', () => this.doSignup());
    document.getElementById('signupPassword2').addEventListener('keydown', e => { if (e.key === 'Enter') this.doSignup(); });
    document.getElementById('goLogin').addEventListener('click', () => { this.hideSignup(); this.showLogin(); });

    // Close modal on backdrop click
    document.getElementById('loginModal').addEventListener('click', e => { if (e.target === e.currentTarget) this.hideLogin(); });
    document.getElementById('signupModal').addEventListener('click', e => { if (e.target === e.currentTarget) this.hideSignup(); });

    // Delegate events on app
    document.getElementById('app').addEventListener('click', e => {
      const vb = e.target.closest('[data-vote]');
      if (vb) { e.stopPropagation(); this.votePost(vb.dataset.pid, vb.dataset.vote); return; }

      const cb = e.target.closest('[data-cvote]');
      if (cb) { e.stopPropagation(); this.voteComment(cb.dataset.cvote); return; }

      const delcm = e.target.closest('[data-delcm]');
      if (delcm) { e.stopPropagation(); this.deleteComment(delcm.dataset.delcm); return; }

      const sb = e.target.closest('[data-sort]');
      if (sb) { AppState.sortBy = sb.dataset.sort; this._rerender(); return; }

      const pb = e.target.closest('[data-page]');
      if (pb) { AppState.currentPage = +pb.dataset.page; this._rerender(); window.scrollTo(0,0); return; }

      const card = e.target.closest('.post-card');
      if (card && !e.target.closest('a') && !e.target.closest('button')) Router.go('/p/' + card.dataset.pid);
    });
  },

  _rerender() {
    if (AppState.currentView === 'home') this.showHome();
    else if (AppState.currentView === 'board') this.showBoard(AppState.currentBoardId);
    else if (AppState.currentView === 'search') this.showSearch(document.getElementById('searchInput').value.trim());
  },

  showLogin() {
    document.getElementById('loginError').textContent = '';
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginModal').classList.add('active');
    setTimeout(() => document.getElementById('loginUsername').focus(), 80);
  },
  hideLogin() { document.getElementById('loginModal').classList.remove('active'); },

  showSignup() {
    document.getElementById('signupError').textContent = '';
    ['signupUsername','signupNickname','signupPassword','signupPassword2'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('signupModal').classList.add('active');
    setTimeout(() => document.getElementById('signupUsername').focus(), 80);
  },
  hideSignup() { document.getElementById('signupModal').classList.remove('active'); },

  doLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const res = Auth.login(username, password);
    if (!res.ok) { document.getElementById('loginError').textContent = res.msg; return; }
    this.hideLogin();
    this.updateUserUI();
    toast(`환영합니다, ${Auth.current.nickname}님!`);
    this._rerender();
  },

  doSignup() {
    const username = document.getElementById('signupUsername').value.trim();
    const nickname = document.getElementById('signupNickname').value.trim();
    const password = document.getElementById('signupPassword').value;
    const password2 = document.getElementById('signupPassword2').value;
    const res = Auth.signup(username, nickname, password, password2);
    if (!res.ok) { document.getElementById('signupError').textContent = res.msg; return; }
    this.hideSignup();
    this.updateUserUI();
    toast(`회원가입 완료! 환영합니다, ${Auth.current.nickname}님!`);
    this._rerender();
  },

  doLogout() {
    Auth.logout();
    this.updateUserUI();
    toast('로그아웃 되었습니다.');
    this._rerender();
  },

  doSearch() {
    const q = document.getElementById('searchInput').value.trim();
    if (!q) return;
    Router.go('/search?q=' + encodeURIComponent(q));
  },

  votePost(postId, dir) {
    if (!Auth.isLoggedIn()) { this.showLogin(); toast('로그인 후 투표할 수 있습니다.'); return; }
    const p = Data.post(postId); if (!p) return;
    const prev = Data.getVote('p', postId);
    let up = p.upvotes, down = p.downvotes;
    if (prev === dir) { dir === 'up' ? up-- : down--; Data.votePost(postId, null, {up, down}); }
    else { if (prev==='up') up--; if (prev==='down') down--; dir==='up' ? up++ : down++; Data.votePost(postId, dir, {up, down}); }
    const newDir = prev === dir ? null : dir;
    const card = document.querySelector(`.post-card[data-pid="${postId}"]`);
    if (card) {
      const score = up - down, sc = score>0?'pos':score<0?'neg':'';
      card.querySelector('.vote-count').textContent = score;
      card.querySelector('.vote-count').className = `vote-count ${sc}`;
      card.querySelectorAll('.vote-btn').forEach(btn => {
        btn.classList.toggle('voted-up',  newDir==='up'   && btn.dataset.vote==='up');
        btn.classList.toggle('voted-down', newDir==='down' && btn.dataset.vote==='down');
      });
    }
    if (AppState.currentView === 'post' && AppState.currentPostId === postId) this._refreshDetailVote(postId);
  },

  _refreshDetailVote(postId) {
    const p = Data.post(postId); if (!p) return;
    const uv = Data.getVote('p', postId);
    const u = document.querySelector('.vote-bar-btn:not(.down)');
    const d = document.querySelector('.vote-bar-btn.down');
    if (u) { u.innerHTML = `▲ 추천 ${p.upvotes}`; u.className = `vote-bar-btn${uv==='up'?' voted':''}`; }
    if (d) { d.innerHTML = `▼ 비추천 ${p.downvotes}`; d.className = `vote-bar-btn down${uv==='down'?' voted':''}`; }
  },

  voteComment(id) {
    if (!Auth.isLoggedIn()) { this.showLogin(); toast('로그인 후 투표할 수 있습니다.'); return; }
    const c = AppState.comments.find(x => x.id === id); if (!c) return;
    if (Data.getVote('c', id)) { toast('이미 추천했습니다.'); return; }
    c.upvotes++; Data.voteComment(id, c.upvotes);
    const btn = document.querySelector(`[data-cvote="${id}"]`);
    if (btn) { btn.textContent = `▲ ${c.upvotes}`; btn.classList.add('voted-up'); }
    toast('추천했습니다!');
  },

  share(postId) {
    const url = location.origin + location.pathname + '#/p/' + postId;
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast('링크가 복사되었습니다!'));
    else toast('링크: ' + url);
  },

  deletePost(postId) {
    if (!Data.canDelete(Data.post(postId)?.authorId)) { toast('권한이 없습니다.'); return; }
    if (!confirm('이 게시글을 삭제할까요?')) return;
    Data.deletePost(postId);
    toast('게시글이 삭제되었습니다.');
    if (AppState.currentView === 'post') {
      if (AppState.currentBoardId) Router.go('/b/' + AppState.currentBoardId);
      else Router.go('/');
    } else {
      this._rerender();
    }
  },

  deleteComment(commentId) {
    const c = AppState.comments.find(x => x.id === commentId);
    if (!c || !Data.canDelete(c.authorId)) { toast('권한이 없습니다.'); return; }
    if (!confirm('이 댓글을 삭제할까요?')) return;
    Data.deleteComment(commentId);
    const el = document.getElementById('cm-' + commentId);
    if (el) el.remove();
    const cnt = AppState.comments.filter(x => x.postId === AppState.currentPostId).length;
    const hdr = document.getElementById('cmHeader');
    if (hdr) hdr.textContent = `댓글 ${cnt}개`;
    toast('댓글이 삭제되었습니다.');
  },

  showHome() {
    AppState.currentView = 'home'; AppState.currentBoardId = null;
    this.setSidebarActive(null);
    const posts = Data.posts(null, AppState.sortBy);
    const { currentPage: pg, postsPerPage: per } = AppState;
    const paged = posts.slice((pg-1)*per, pg*per);
    const hot = [...AppState.posts].sort((a,b) => (b.upvotes-b.downvotes)-(a.upvotes-a.downvotes)).slice(0,5);
    document.getElementById('app').innerHTML = `
      <div class="home-layout">
        <div class="home-main">
          <div class="board-header"><h1>🏠 전체 게시글</h1><p>모든 게시판의 최신 글을 확인하세요</p></div>
          ${sortBar(AppState.sortBy)}
          ${postList(paged, true)}
          ${pagination(posts.length, pg, per)}
        </div>
        <aside class="home-sidebar">
          <div class="widget">
            <div class="widget-header">🔥 실시간 인기글</div>
            <div class="widget-body">
              ${hot.map(p => `
                <div class="hot-post-item" onclick="Router.go('/p/${p.id}')">
                  <div class="hot-post-title">${esc(p.title)}</div>
                  <div class="hot-post-meta">▲ ${p.upvotes-p.downvotes} · 💬 ${p.commentCount||0}</div>
                </div>`).join('')}
            </div>
          </div>
          <div class="widget">
            <div class="widget-header">📋 게시판 목록</div>
            <div class="widget-body">
              ${AppState.boards.map((b,i) => `
                <div class="widget-board-item" onclick="Router.go('/b/${b.id}')">
                  <span class="widget-board-rank">${i+1}</span>
                  <span>${b.icon}</span><span>${esc(b.name)}</span>
                </div>`).join('')}
            </div>
          </div>
          <div class="widget">
            <div class="widget-header">ℹ️ 커뮤니티 안내</div>
            <div class="widget-body" style="padding:12px 16px;font-size:13px;line-height:1.8;color:var(--text-muted)">
              서로를 존중하고 따뜻한 커뮤니티를 만들어요.<br>
              욕설, 혐오 발언은 삼가해 주세요.<br><br>
              ${Auth.isLoggedIn()
                ? `<button class="btn-primary" style="width:100%;border-radius:4px" onclick="document.getElementById ? (Router.go('/write')) : null">✏️ 글쓰기</button>`
                : `<button class="btn-primary" style="width:100%;border-radius:4px" onclick="App.showLogin()">🔑 로그인 후 글쓰기</button>`}
            </div>
          </div>
        </aside>
      </div>`;
  },

  showBoard(boardId) {
    const board = Data.board(boardId); if (!board) { Router.go('/'); return; }
    AppState.currentView = 'board'; AppState.currentBoardId = boardId;
    this.setSidebarActive(boardId);
    const posts = Data.posts(boardId, AppState.sortBy);
    const { currentPage: pg, postsPerPage: per } = AppState;
    const paged = posts.slice((pg-1)*per, pg*per);
    document.getElementById('app').innerHTML = `
      <div style="max-width:800px;margin:0 auto">
        <div class="board-header"><h1>${board.icon} ${esc(board.name)}</h1><p>${esc(board.desc)}</p></div>
        ${sortBar(AppState.sortBy)}
        ${postList(paged, false)}
        ${pagination(posts.length, pg, per)}
      </div>`;
  },

  showPost(postId) {
    const post = Data.post(postId); if (!post) { Router.go('/'); return; }
    AppState.currentView = 'post'; AppState.currentPostId = postId;
    this.setSidebarActive(post.boardId);
    Data.incrViews(postId);
    const board = Data.board(post.boardId);
    const comments = Data.comments(postId);
    const uv = Data.getVote('p', postId);
    const canDel = Data.canDelete(post.authorId);

    const commentFormHtml = Auth.isLoggedIn()
      ? `<div class="comment-form">
           <textarea class="comment-textarea" id="cmText" placeholder="댓글을 작성하세요..."></textarea>
           <div class="comment-form-actions"><button class="btn-primary" id="cmSubmit">댓글 작성</button></div>
         </div>`
      : `<div class="comment-login-notice">
           댓글을 작성하려면 로그인이 필요합니다.
           <button class="btn-outline btn-sm" onclick="App.showLogin()" style="border-radius:20px;padding:4px 12px">로그인</button>
           <button class="link-btn" onclick="App.showSignup()">회원가입</button>
         </div>`;

    document.getElementById('app').innerHTML = `
      <div class="post-detail">
        <div class="breadcrumb">
          <a href="#/">홈</a> ›
          ${board ? `<a href="#/b/${board.id}">${board.icon} ${esc(board.name)}</a> ›` : ''}
          <span>게시글</span>
        </div>
        <div class="post-detail-card">
          <div class="post-detail-header">
            <div class="post-meta">
              ${board ? `<a class="board-tag" href="#/b/${board.id}">${board.icon} ${board.name}</a>` : ''}
              <span>${esc(post.author)}</span><span>·</span>
              <span>${timeAgo(post.createdAt)}</span><span>·</span>
              <span>👁 ${post.views||0}회 조회</span>
            </div>
            <h1 class="post-detail-title">${esc(post.title)}</h1>
          </div>
          <div class="post-detail-body">${esc(post.content)}</div>
          ${renderPostMedia(post)}
          <div class="post-detail-footer">
            <div class="vote-bar">
              <button class="vote-bar-btn${uv==='up'?' voted':''}" id="dvUp">▲ 추천 ${post.upvotes}</button>
              <button class="vote-bar-btn down${uv==='down'?' voted':''}" id="dvDown">▼ 비추천 ${post.downvotes}</button>
            </div>
            <button class="post-action-btn" onclick="App.share('${post.id}')">🔗 공유</button>
            <button class="post-action-btn" onclick="history.back()">◀ 목록</button>
            ${canDel ? `<button class="post-action-btn danger" onclick="App.deletePost('${post.id}')" style="margin-left:auto">🗑 게시글 삭제</button>` : ''}
          </div>
        </div>
        <div class="comments-section">
          <div class="comments-header" id="cmHeader">댓글 ${comments.length}개</div>
          ${commentFormHtml}
          <div id="cmList">
            ${comments.length
              ? comments.map(commentItem).join('')
              : '<div style="text-align:center;padding:32px;color:var(--text-muted)">첫 번째 댓글을 작성해보세요!</div>'}
          </div>
        </div>
      </div>`;

    document.getElementById('dvUp').addEventListener('click', () => this.votePost(postId, 'up'));
    document.getElementById('dvDown').addEventListener('click', () => this.votePost(postId, 'down'));

    if (Auth.isLoggedIn()) {
      document.getElementById('cmSubmit').addEventListener('click', () => {
        const text = document.getElementById('cmText').value.trim();
        if (!text) { toast('댓글 내용을 입력하세요.'); return; }
        const c = Data.addComment({ postId, content: text, author: Auth.current.nickname, authorId: Auth.current.id });
        document.getElementById('cmText').value = '';
        const list = document.getElementById('cmList');
        if (list.querySelector('[style]')) list.innerHTML = '';
        list.insertAdjacentHTML('beforeend', commentItem(c));
        const cnt = AppState.comments.filter(x => x.postId === postId).length;
        document.getElementById('cmHeader').textContent = `댓글 ${cnt}개`;
        toast('댓글이 등록되었습니다!');
      });
    }
  },

  showWrite(boardId) {
    if (!Auth.isLoggedIn()) {
      document.getElementById('app').innerHTML = `
        <div class="login-gate">
          <div class="gate-icon">✏️</div>
          <h2>글쓰기</h2>
          <p>글을 작성하려면 로그인이 필요합니다.</p>
          <div class="gate-btns">
            <button class="btn-outline" onclick="App.showLogin()">로그인</button>
            <button class="btn-primary" onclick="App.showSignup()">회원가입</button>
          </div>
        </div>`;
      return;
    }
    AppState.currentView = 'write';
    this.setSidebarActive(boardId);
    document.getElementById('app').innerHTML = `
      <div class="write-page">
        <div class="write-card">
          <h1>✏️ 글쓰기</h1>
          <div class="form-group">
            <label class="form-label">게시판</label>
            <select class="form-select" id="wBoard">
              ${AppState.boards.map(b => `<option value="${b.id}"${b.id===boardId?' selected':''}>${b.icon} ${esc(b.name)}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">제목</label>
            <input type="text" class="form-input" id="wTitle" placeholder="제목을 입력하세요" maxlength="100">
          </div>
          <div class="form-group">
            <label class="form-label">내용</label>
            <textarea class="form-textarea" id="wContent" placeholder="내용을 입력하세요..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">미디어 첨부 <span class="form-hint">선택사항</span></label>
            <div class="media-box">
              <div class="media-tabs">
                <button type="button" class="mtab active" id="mtabImg">🖼️ 사진</button>
                <button type="button" class="mtab" id="mtabVid">🎬 영상 URL</button>
              </div>
              <div id="mpImg" class="media-panel">
                <div class="img-drop-zone" id="imgDropZone">
                  <input type="file" id="imgFileInput" accept="image/*" multiple style="display:none">
                  <div class="img-drop-inner">
                    <div style="font-size:36px;margin-bottom:8px">📷</div>
                    <div style="font-weight:600">클릭하거나 드래그해서 사진 업로드</div>
                    <div style="font-size:12px;color:var(--text-muted);margin-top:4px">최대 5장 · 각 10MB 이하 · 자동 압축 적용</div>
                  </div>
                </div>
                <div class="img-preview-grid" id="imgPreviewGrid"></div>
              </div>
              <div id="mpVid" class="media-panel" style="display:none">
                <input type="text" class="form-input" id="vidUrlInput" placeholder="YouTube 링크 또는 영상 파일 URL (예: https://youtu.be/...)">
                <div id="vidPreviewBox" style="margin-top:12px"></div>
              </div>
            </div>
          </div>
          <div class="write-actions">
            <button class="btn-outline" onclick="history.back()">취소</button>
            <button class="btn-primary" id="wSubmit">게시하기</button>
          </div>
        </div>
      </div>`;

    // 미디어 탭 전환
    document.getElementById('mtabImg').addEventListener('click', () => {
      document.getElementById('mpImg').style.display = '';
      document.getElementById('mpVid').style.display = 'none';
      document.getElementById('mtabImg').classList.add('active');
      document.getElementById('mtabVid').classList.remove('active');
    });
    document.getElementById('mtabVid').addEventListener('click', () => {
      document.getElementById('mpImg').style.display = 'none';
      document.getElementById('mpVid').style.display = '';
      document.getElementById('mtabImg').classList.remove('active');
      document.getElementById('mtabVid').classList.add('active');
    });

    // 이미지 업로드
    const dropZone = document.getElementById('imgDropZone');
    const fileInput = document.getElementById('imgFileInput');
    const previewGrid = document.getElementById('imgPreviewGrid');

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('drag-over'); handleFiles(e.dataTransfer.files); });
    fileInput.addEventListener('change', () => { handleFiles(fileInput.files); fileInput.value = ''; });

    async function handleFiles(files) {
      const existing = previewGrid.querySelectorAll('.img-preview-item').length;
      const slots = 5 - existing;
      if (slots <= 0) { toast('최대 5장까지 첨부할 수 있습니다.'); return; }
      const toProcess = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, slots);
      for (const file of toProcess) {
        if (file.size > 10 * 1024 * 1024) { toast(`${file.name}: 10MB를 초과합니다.`); continue; }
        toast('이미지 처리 중...');
        const compressed = await compressImage(file);
        const item = document.createElement('div');
        item.className = 'img-preview-item';
        item.innerHTML = `<img src="${compressed}" alt="미리보기"><button class="img-remove-btn" type="button" title="삭제">✕</button>`;
        item.querySelector('.img-remove-btn').addEventListener('click', () => item.remove());
        previewGrid.appendChild(item);
      }
    }

    // 영상 URL 미리보기
    document.getElementById('vidUrlInput').addEventListener('input', function() {
      const box = document.getElementById('vidPreviewBox');
      const v = parseVideoUrl(this.value.trim());
      if (v?.type === 'youtube') {
        box.innerHTML = `<div class="post-video-wrap"><iframe src="${v.embedUrl}" frameborder="0" allowfullscreen></iframe></div>`;
      } else if (v?.type === 'direct') {
        box.innerHTML = `<div class="post-video-wrap"><video src="${v.url}" controls></video></div>`;
      } else {
        box.innerHTML = this.value.trim() ? '<p style="font-size:13px;color:var(--text-muted)">유효한 YouTube URL 또는 영상 URL을 입력하세요.</p>' : '';
      }
    });

    document.getElementById('wSubmit').addEventListener('click', () => {
      const bid = document.getElementById('wBoard').value;
      const title = document.getElementById('wTitle').value.trim();
      const content = document.getElementById('wContent').value.trim();
      if (!title) { toast('제목을 입력하세요.'); return; }
      if (!content) { toast('내용을 입력하세요.'); return; }
      const images = Array.from(previewGrid.querySelectorAll('.img-preview-item img')).map(img => img.src);
      const video = document.getElementById('vidUrlInput').value.trim();
      const p = Data.addPost({ boardId: bid, title, content, author: Auth.current.nickname, authorId: Auth.current.id, images, video });
      toast('게시글이 등록되었습니다!');
      Router.go('/p/' + p.id);
    });
    setTimeout(() => document.getElementById('wTitle')?.focus(), 80);
  },

  showSearch(query) {
    AppState.currentView = 'search'; this.setSidebarActive(null);
    document.getElementById('searchInput').value = query;
    const posts = Data.posts(null, AppState.sortBy, query);
    const { currentPage: pg, postsPerPage: per } = AppState;
    const paged = posts.slice((pg-1)*per, pg*per);
    document.getElementById('app').innerHTML = `
      <div style="max-width:800px;margin:0 auto">
        <div class="search-header">🔍 "<strong>${esc(query)}</strong>" 검색 결과 — ${posts.length}건</div>
        ${sortBar(AppState.sortBy)}
        ${postList(paged, true)}
        ${pagination(posts.length, pg, per)}
      </div>`;
  },

  showAdmin() {
    if (!Auth.isAdmin()) { Router.go('/'); toast('관리자만 접근할 수 있습니다.'); return; }
    AppState.currentView = 'admin';
    this.setSidebarActive(null, true);
    const users = Auth.getUsers();
    const totalPosts = AppState.posts.length;
    const totalComments = AppState.comments.length;

    const rows = users.map((u, i) => {
      const postCnt = AppState.posts.filter(p => p.authorId === u.id).length;
      const cmCnt   = AppState.comments.filter(c => c.authorId === u.id).length;
      const isSelf  = u.id === Auth.current.id;
      const isAdm   = u.role === 'admin';
      const joinDate = new Date(u.createdAt).toLocaleDateString('ko-KR');
      const statusBadge = isAdm
        ? `<span class="badge badge-admin-pill">관리자</span>`
        : u.isBanned
          ? `<span class="badge badge-banned-pill">차단</span>`
          : `<span class="badge badge-member-pill">활성</span>`;

      const actions = isSelf ? `<span style="font-size:12px;color:var(--text-muted)">본인 계정</span>` :
        isAdm ? `<span style="font-size:12px;color:var(--text-muted)">-</span>` :
        `<div class="actions">
          ${u.isBanned
            ? `<button class="btn-success" onclick="App.adminUnban('${u.id}')">차단 해제</button>`
            : `<button class="btn-warning" onclick="App.adminBan('${u.id}')">차단</button>`}
          <button class="btn-danger" onclick="App.adminDeleteUser('${u.id}', '${esc(u.nickname)}')">삭제</button>
        </div>`;

      return `<tr>
        <td>${i+1}</td>
        <td><span class="admin-username">${esc(u.username)}</span>${isSelf?'<span class="admin-you">(나)</span>':''}</td>
        <td>${esc(u.nickname)}</td>
        <td>${joinDate}</td>
        <td>${postCnt}</td>
        <td>${cmCnt}</td>
        <td>${statusBadge}</td>
        <td>${actions}</td>
      </tr>`;
    }).join('');

    document.getElementById('app').innerHTML = `
      <div class="admin-panel">
        <h1>👑 관리자 패널</h1>
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-num">${users.length}</div><div class="stat-label">총 회원 수</div></div>
          <div class="stat-card"><div class="stat-num">${totalPosts}</div><div class="stat-label">총 게시글 수</div></div>
          <div class="stat-card"><div class="stat-num">${totalComments}</div><div class="stat-label">총 댓글 수</div></div>
        </div>
        <div class="admin-section">
          <div class="admin-section-header">👥 회원 관리</div>
          <div style="overflow-x:auto">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>#</th><th>아이디</th><th>닉네임</th><th>가입일</th>
                  <th>게시글</th><th>댓글</th><th>상태</th><th>관리</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>

        <div class="admin-section">
          <div class="admin-section-header">📥 콘텐츠 가져오기 (Hacker News)</div>
          <div class="import-box">
            <p style="margin:0 0 12px;color:var(--text-muted);font-size:14px">Hacker News 인기글을 실시간으로 가져와 관리자 계정으로 등록합니다.</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
              <select id="importBoard" class="form-input" style="width:auto;padding:8px 12px">
                ${AppState.boards.map(b => `<option value="${b.id}">${b.icon} ${b.name}</option>`).join('')}
              </select>
              <select id="importCount" class="form-input" style="width:auto;padding:8px 12px">
                <option value="5">5개</option>
                <option value="10" selected>10개</option>
                <option value="20">20개</option>
              </select>
              <button class="btn-primary" id="importBtn" onclick="App.importFromHN()">HN 글 가져오기</button>
            </div>
            <div id="importStatus" style="margin-top:10px;font-size:14px;color:var(--text-muted)"></div>
          </div>
        </div>
      </div>`;
  },

  async importFromHN() {
    const boardId = document.getElementById('importBoard')?.value;
    const count = parseInt(document.getElementById('importCount')?.value || '10');
    const btn = document.getElementById('importBtn');
    const status = document.getElementById('importStatus');
    if (!boardId || !btn) return;
    btn.disabled = true;
    btn.textContent = '가져오는 중...';
    status.textContent = 'HN 상위 글 목록 조회 중...';
    try {
      const topRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const topIds = await topRes.json();
      const existing = new Set(AppState.posts.map(p => p.id.replace('hn_', '')));
      const candidates = topIds.filter(id => !existing.has(String(id)));
      const toFetch = candidates.slice(0, count * 3);
      const items = [];
      for (const id of toFetch) {
        if (items.length >= count) break;
        try {
          const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          const item = await r.json();
          if (!item || !item.title || item.dead || item.deleted) continue;
          const content = (item.url ? `🔗 원문: ${item.url}\n\n` : '') +
            (item.text ? item.text.replace(/<[^>]+>/g, '') + '\n\n' : '') +
            `[Hacker News] 추천 ${item.score||0}점 · 댓글 ${item.descendants||0}개 · by ${item.by||'익명'}`;
          items.push({
            id: `hn_${item.id}`,
            boardId,
            title: item.title,
            content,
            author: '관리자',
            authorId: ADMIN_ID,
            upvotes: item.score || 0,
            downvotes: 0,
            views: 0,
            createdAt: (item.time || Math.floor(Date.now()/1000)) * 1000,
            commentCount: 0,
            images: [],
            video: '',
          });
          status.textContent = `${items.length}/${count}개 수집 중...`;
        } catch(_) {}
      }
      if (items.length === 0) { status.textContent = '가져올 새 글이 없습니다.'; btn.disabled = false; btn.textContent = 'HN 글 가져오기'; return; }
      const all = [... items, ...AppState.posts];
      S.set('posts', all);
      AppState.posts = all;
      status.innerHTML = `<span style="color:var(--success)">✓ ${items.length}개 글을 성공적으로 가져왔습니다!</span>`;
      toast(`HN에서 ${items.length}개 글을 가져왔습니다`);
    } catch(e) {
      status.textContent = '오류: ' + e.message;
    }
    btn.disabled = false;
    btn.textContent = 'HN 글 가져오기';
  },

  openImg(idx, postId) {
    const post = Data.post(postId);
    if (!post?.images?.length) return;
    let cur = parseInt(idx);
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    const render = () => {
      lb.innerHTML = `
        <div class="lightbox-inner">
          <button class="lb-close" onclick="this.closest('.lightbox').remove()">✕</button>
          ${post.images.length > 1 ? `<button class="lb-nav lb-prev" id="lbPrev">‹</button>` : ''}
          <img src="${post.images[cur]}" alt="이미지 ${cur+1}">
          ${post.images.length > 1 ? `<button class="lb-nav lb-next" id="lbNext">›</button>` : ''}
          ${post.images.length > 1 ? `<div class="lb-counter">${cur+1} / ${post.images.length}</div>` : ''}
        </div>`;
      lb.querySelector('#lbPrev')?.addEventListener('click', e => { e.stopPropagation(); cur = (cur - 1 + post.images.length) % post.images.length; render(); });
      lb.querySelector('#lbNext')?.addEventListener('click', e => { e.stopPropagation(); cur = (cur + 1) % post.images.length; render(); });
    };
    render();
    lb.addEventListener('click', e => { if (e.target === lb) lb.remove(); });
    document.addEventListener('keydown', function onKey(e) {
      if (!document.body.contains(lb)) { document.removeEventListener('keydown', onKey); return; }
      if (e.key === 'Escape') lb.remove();
      if (e.key === 'ArrowLeft') { cur = (cur - 1 + post.images.length) % post.images.length; render(); }
      if (e.key === 'ArrowRight') { cur = (cur + 1) % post.images.length; render(); }
    });
    document.body.appendChild(lb);
  },

  adminBan(userId) {
    if (!confirm('이 회원을 차단할까요? 차단된 회원은 로그인할 수 없습니다.')) return;
    if (Auth.banUser(userId)) { toast('차단되었습니다.'); this.showAdmin(); }
    else toast('오류가 발생했습니다.');
  },

  adminUnban(userId) {
    if (Auth.unbanUser(userId)) { toast('차단이 해제되었습니다.'); this.showAdmin(); }
    else toast('오류가 발생했습니다.');
  },

  adminDeleteUser(userId, nickname) {
    if (!confirm(`"${nickname}" 회원을 삭제할까요? 이 작업은 되돌릴 수 없습니다.`)) return;
    if (Auth.deleteUser(userId)) { toast('회원이 삭제되었습니다.'); this.showAdmin(); }
    else toast('삭제할 수 없습니다.');
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
