// ===== STATE =====
const AppState = {
  boards: [],
  posts: [],
  comments: [],
  user: { nickname: '', isLoggedIn: false },
  currentView: 'home',
  currentBoardId: null,
  currentPostId: null,
  sortBy: 'latest',
  currentPage: 1,
  postsPerPage: 20,
};

// ===== INITIAL DATA =====
const BOARDS = [
  { id: 'general', name: '자유게시판', icon: '💬', desc: '무엇이든 자유롭게 이야기하세요' },
  { id: 'humor',   name: '유머',       icon: '😂', desc: '웃긴 이야기와 짤방을 공유해요' },
  { id: 'news',    name: '뉴스',       icon: '📰', desc: '오늘의 뉴스와 이슈를 공유해요' },
  { id: 'politics',name: '정치',       icon: '🏛️', desc: '정치 이야기, 서로 존중하며 토론해요' },
  { id: 'sports',  name: '스포츠',     icon: '⚽', desc: '스포츠 소식과 응원' },
  { id: 'gaming',  name: '게임',       icon: '🎮', desc: '게임 이야기 무엇이든' },
  { id: 'food',    name: '맛집/음식',  icon: '🍜', desc: '맛집 추천과 음식 이야기' },
  { id: 'travel',  name: '여행',       icon: '✈️', desc: '여행 정보와 후기' },
];

const now = Date.now();
const SAMPLE_POSTS = [
  { id: 'p1',  boardId: 'general',  title: '오늘 첫 커밋 성공했습니다!', content: '드디어 첫 번째 프로젝트를 완성하고 깃허브에 올렸어요.\n뿌듯하네요 ㅎㅎ 다들 응원해주세요!', author: '코딩새내기', upvotes: 142, downvotes: 3,  views: 892,  createdAt: now - 7200000,   commentCount: 2 },
  { id: 'p2',  boardId: 'humor',    title: '개발자 밈 모음 ㄷㄷ', content: '1. 예상: 버그 1개 수정\n현실: 버그 5개 추가\n\n2. PM: 이거 얼마나 걸려요?\n개발자: 2일이요.\n(실제로는 2주)\n\n3. 코드 주석: 나중에 고칠 것\n(나중 = 영원히)', author: '짤방러',     upvotes: 384, downvotes: 12, views: 2341, createdAt: now - 18000000,  commentCount: 2 },
  { id: 'p3',  boardId: 'news',     title: '국내 AI 스타트업 시리즈B 200억 투자 유치', content: '국내 AI 스타트업 A사가 오늘 시리즈B 라운드에서 200억원 규모의 투자를 유치했다.\n이번 투자금은 연구개발 및 인재 채용에 활용할 계획이라고 밝혔다.', author: '뉴스봇',   upvotes: 67,  downvotes: 5,  views: 1203, createdAt: now - 28800000,  commentCount: 0 },
  { id: 'p4',  boardId: 'sports',   title: '손흥민 올 시즌 리그 15골 달성!', content: '토트넘의 손흥민이 오늘 경기에서 골을 넣으며 올 시즌 프리미어리그 15골을 달성했습니다.\n개인 최다 기록 경신에 도전 중입니다! ⚽', author: '손세이셔널', upvotes: 521, downvotes: 18, views: 4231, createdAt: now - 43200000,  commentCount: 1 },
  { id: 'p5',  boardId: 'gaming',   title: '롤 신 챔피언 사기 아님?', content: '진짜 이거 뭐임? 한 게임에 펜타킬 두 번 나왔는데\n제발 너프 좀 해줘라 라이엇아...\n\n원딜인데 탱크보다 버팀 ㅋㅋㅋ', author: '골드탈출기원', upvotes: 203, downvotes: 45, views: 3102, createdAt: now - 10800000,  commentCount: 0 },
  { id: 'p6',  boardId: 'food',     title: '성수동 핫플 카페 솔직 후기', content: '주말에 성수동 카페투어 다녀왔습니다!\n\n1. A카페: 인테리어는 예쁜데 아메리카노 8000원... 비쌈\n2. B카페: 줄이 너무 길어서 포기\n3. C카페: 숨겨진 맛집! 커피맛도 좋고 분위기도 좋음 👍\n\n성수동 카페 더 추천받아요~', author: '카페탐방러', upvotes: 89,  downvotes: 2,  views: 876,  createdAt: now - 86400000,  commentCount: 0 },
  { id: 'p7',  boardId: 'travel',   title: '오사카 3박4일 여행 후기', content: '드디어 오사카 다녀왔습니다!\n\n1일차: 도톤보리 - 타코야키, 오코노미야키 먹방\n2일차: 오사카성, 신세카이\n3일차: 유니버셜 스튜디오 재팬\n4일차: 공항\n\n엔저라 비용이 항공+숙박 합쳐서 60만원 수준이었어요!\n추천 맛집 있으면 알려주세요 😊', author: '여행러버', upvotes: 156, downvotes: 4,  views: 2891, createdAt: now - 172800000, commentCount: 0 },
  { id: 'p8',  boardId: 'general',  title: '요즘 AI 도구 어떻게 활용하세요?', content: 'AI가 너무 발전해서 뭐든 물어보게 되더라고요.\n코딩할 때, 글쓸 때, 번역할 때 다 쓰는 것 같은데\n다들 어떻게 활용하시나요?', author: '테크궁금이', upvotes: 78,  downvotes: 9,  views: 1543, createdAt: now - 21600000,  commentCount: 0 },
  { id: 'p9',  boardId: 'humor',    title: '아침에 커피 내리다 깨달은 것', content: '커피를 내리면서 문득 생각이 들었다.\n\n나는 지금 콩을 갈아서 뜨거운 물에 녹여 마시고 있구나.\n\n인류는 위대하다.', author: '철학자커피', upvotes: 612, downvotes: 8,  views: 5234, createdAt: now - 3600000,   commentCount: 2 },
  { id: 'p10', boardId: 'politics', title: '선거제도 개편 어떻게 생각하시나요?', content: '비례대표 확대 vs 소선거구제 유지 중 어느 쪽이 더 낫다고 생각하시나요?\n다양한 의견 환영합니다. 서로 존중하며 토론해요.', author: '정치토론방', upvotes: 34,  downvotes: 28, views: 789,  createdAt: now - 129600000, commentCount: 0 },
];

const SAMPLE_COMMENTS = [
  { id: 'c1', postId: 'p1', content: '축하드려요! 저도 첫 커밋할 때 그 기분 잊을 수가 없어요 ㅎㅎ', author: '선배개발자', upvotes: 23, createdAt: now - 5400000 },
  { id: 'c2', postId: 'p1', content: '어떤 프로젝트예요? 링크 공유해주세요!', author: '궁금이', upvotes: 11, createdAt: now - 3600000 },
  { id: 'c3', postId: 'p2', content: 'ㅋㅋㅋㅋ 2일 = 2주 실화임 진짜로', author: '7년차개발자', upvotes: 89, createdAt: now - 14400000 },
  { id: 'c4', postId: 'p2', content: '예상: 간단한 수정\n현실: 전체 리팩토링\n\n이것도 추가해주세요', author: '리팩토링맨', upvotes: 45, createdAt: now - 10800000 },
  { id: 'c5', postId: 'p4', content: '손흥민 진짜 대단하다... 꼭 우승 트로피 안겨줬으면', author: '프리미어팬', upvotes: 34, createdAt: now - 36000000 },
  { id: 'c6', postId: 'p9', content: '이게 바로 철학이죠 ㅋㅋㅋ 아침부터 깨달음을', author: '아침철학자', upvotes: 156, createdAt: now - 1800000 },
  { id: 'c7', postId: 'p9', content: '그러고 보면 인류는 거의 모든 걸 발효시키거나 갈아서 먹는 것 같음', author: '인류학자', upvotes: 78, createdAt: now - 2880000 },
];

// ===== STORAGE =====
const Storage = {
  get(key, def) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  },
};

// ===== UTILS =====
function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

function timeAgo(ts) {
  const d = Date.now() - ts;
  const m = Math.floor(d / 60000), h = Math.floor(d / 3600000), days = Math.floor(d / 86400000);
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  if (h < 24) return `${h}시간 전`;
  if (days < 30) return `${days}일 전`;
  return new Date(ts).toLocaleDateString('ko-KR');
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2500);
}

// ===== DATA =====
const Data = {
  board(id) { return AppState.boards.find(b => b.id === id); },

  posts(boardId, sort, query) {
    let list = [...AppState.posts];
    if (boardId) list = list.filter(p => p.boardId === boardId);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)
      );
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
    Storage.set('posts', AppState.posts);
    return p;
  },

  addComment(data) {
    const c = { id: genId(), ...data, upvotes: 0, createdAt: Date.now() };
    AppState.comments.push(c);
    Storage.set('comments', AppState.comments);
    const p = Data.post(data.postId);
    if (p) { p.commentCount = (p.commentCount || 0) + 1; Storage.set('posts', AppState.posts); }
    return c;
  },

  votePost(postId, dir, counts) {
    const p = Data.post(postId);
    if (!p) return;
    p.upvotes = counts.up; p.downvotes = counts.down;
    Storage.set('posts', AppState.posts);
    const uv = Storage.get('uv', {}); uv[`p_${postId}`] = dir; Storage.set('uv', uv);
  },

  voteComment(id, up) {
    const c = AppState.comments.find(x => x.id === id);
    if (!c) return;
    c.upvotes = up; Storage.set('comments', AppState.comments);
    const uv = Storage.get('uv', {}); uv[`c_${id}`] = true; Storage.set('uv', uv);
  },

  getVote(type, id) { return Storage.get('uv', {})[`${type}_${id}`]; },

  incrViews(postId) {
    const p = Data.post(postId);
    if (p) { p.views = (p.views || 0) + 1; Storage.set('posts', AppState.posts); }
  },
};

// ===== RENDER HELPERS =====
function postCard(post, showBoard) {
  const board = Data.board(post.boardId);
  const score = post.upvotes - post.downvotes;
  const sc = score > 0 ? 'pos' : score < 0 ? 'neg' : '';
  const uv = Data.getVote('p', post.id);
  const cc = post.commentCount || AppState.comments.filter(c => c.postId === post.id).length;
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
          <span>👁 ${post.views || 0}</span>
        </div>
        <div class="post-title"><a href="#/p/${post.id}">${esc(post.title)}</a></div>
        ${post.content ? `<div class="post-preview">${esc(post.content)}</div>` : ''}
        <div class="post-actions">
          <button class="post-action-btn" onclick="event.stopPropagation();Router.go('/p/${post.id}')">💬 댓글 ${cc}</button>
          <button class="post-action-btn" onclick="event.stopPropagation();App.share('${post.id}')">🔗 공유</button>
        </div>
      </div>
    </div>`;
}

function commentItem(c) {
  const uv = Data.getVote('c', c.id);
  return `
    <div class="comment-item" id="cm-${c.id}">
      <div class="comment-meta"><span class="comment-author">${esc(c.author)}</span><span>${timeAgo(c.createdAt)}</span></div>
      <div class="comment-body">${esc(c.content)}</div>
      <div class="comment-actions">
        <button class="post-action-btn${uv?' voted-up':''}" data-cvote="${c.id}">▲ ${c.upvotes}</button>
      </div>
    </div>`;
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
  const pages = Math.ceil(total / per);
  if (pages <= 1) return '';
  let b = '';
  const s = Math.max(1, page - 2), e = Math.min(pages, page + 2);
  if (s > 1) b += `<button class="page-btn" data-page="1">1</button>`;
  if (s > 2) b += `<span style="padding:6px 4px;color:var(--text-muted)">…</span>`;
  for (let i = s; i <= e; i++) b += `<button class="page-btn${i===page?' active':''}" data-page="${i}">${i}</button>`;
  if (e < pages - 1) b += `<span style="padding:6px 4px;color:var(--text-muted)">…</span>`;
  if (e < pages) b += `<button class="page-btn" data-page="${pages}">${pages}</button>`;
  return `<div class="pagination">${b}</div>`;
}

function postList(posts, showBoard) {
  if (!posts.length) return `
    <div class="empty-state">
      <div class="empty-icon">📭</div>
      <h3>게시글이 없습니다</h3>
      <p>첫 번째 글을 작성해보세요!</p>
      <button class="btn-primary" onclick="document.getElementById('writeBtn').click()">글쓰기</button>
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
    else if (h.startsWith('/write')) {
      const bid = h.includes('?board=') ? h.split('?board=')[1] : null;
      App.showWrite(bid);
    } else if (h.startsWith('/search')) {
      const q = new URLSearchParams(h.split('?')[1] || '').get('q') || '';
      App.showSearch(q);
    }
  },
  go(path) { window.location.hash = path; },
};

// ===== APP =====
const App = {
  init() {
    AppState.boards = BOARDS;
    AppState.posts = Storage.get('posts', SAMPLE_POSTS);
    AppState.comments = Storage.get('comments', SAMPLE_COMMENTS);
    AppState.user = Storage.get('user', { nickname: '', isLoggedIn: false });
    AppState.posts.forEach(p => {
      p.commentCount = AppState.comments.filter(c => c.postId === p.id).length;
    });
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
  },

  setSidebarActive(boardId) {
    document.querySelectorAll('.sidebar-board-item').forEach(el => {
      const href = el.getAttribute('href');
      el.classList.toggle('active', boardId ? href === `#/b/${boardId}` : href === '#/');
    });
  },

  updateUserUI() {
    const sec = document.getElementById('userSection');
    if (AppState.user.nickname) {
      sec.innerHTML = `<span class="nickname-badge" id="nicknameBtn">👤 ${esc(AppState.user.nickname)}</span>`;
    } else {
      sec.innerHTML = `<button class="btn-outline" id="nicknameBtn">닉네임 설정</button>`;
    }
    document.getElementById('nicknameBtn').addEventListener('click', () => this.showNickModal());
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
    document.getElementById('writeBtn').addEventListener('click', () => {
      if (!AppState.user.nickname) { this.showNickModal(); toast('글을 쓰려면 닉네임을 설정하세요'); return; }
      Router.go('/write' + (AppState.currentBoardId ? `?board=${AppState.currentBoardId}` : ''));
    });
    document.getElementById('cancelNickname').addEventListener('click', () => this.hideNickModal());
    document.getElementById('saveNickname').addEventListener('click', () => this.saveNick());
    document.getElementById('nicknameInput').addEventListener('keydown', e => { if (e.key === 'Enter') this.saveNick(); });

    document.getElementById('app').addEventListener('click', e => {
      const vb = e.target.closest('[data-vote]');
      if (vb) { e.stopPropagation(); this.votePost(vb.dataset.pid, vb.dataset.vote); return; }
      const cb = e.target.closest('[data-cvote]');
      if (cb) { e.stopPropagation(); this.voteComment(cb.dataset.cvote); return; }
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

  doSearch() {
    const q = document.getElementById('searchInput').value.trim();
    if (!q) return;
    Router.go('/search?q=' + encodeURIComponent(q));
  },

  showNickModal() {
    document.getElementById('nicknameInput').value = AppState.user.nickname || '';
    document.getElementById('nicknameModal').classList.add('active');
    setTimeout(() => document.getElementById('nicknameInput').focus(), 80);
  },

  hideNickModal() { document.getElementById('nicknameModal').classList.remove('active'); },

  saveNick() {
    const v = document.getElementById('nicknameInput').value.trim();
    if (v.length < 2 || v.length > 20) { toast('닉네임은 2~20자로 입력하세요'); return; }
    AppState.user = { nickname: v, isLoggedIn: true };
    Storage.set('user', AppState.user);
    this.updateUserUI();
    this.hideNickModal();
    toast('닉네임이 설정되었습니다!');
  },

  votePost(postId, dir) {
    if (!AppState.user.nickname) { toast('닉네임을 먼저 설정하세요'); this.showNickModal(); return; }
    const p = Data.post(postId); if (!p) return;
    const prev = Data.getVote('p', postId);
    let up = p.upvotes, down = p.downvotes;
    if (prev === dir) { dir === 'up' ? up-- : down--; Data.votePost(postId, null, {up, down}); }
    else {
      if (prev === 'up') up--; if (prev === 'down') down--;
      dir === 'up' ? up++ : down++;
      Data.votePost(postId, dir, {up, down});
    }
    const newDir = prev === dir ? null : dir;
    const card = document.querySelector(`.post-card[data-pid="${postId}"]`);
    if (card) {
      const score = up - down, sc = score > 0 ? 'pos' : score < 0 ? 'neg' : '';
      card.querySelector('.vote-count').textContent = score;
      card.querySelector('.vote-count').className = `vote-count ${sc}`;
      card.querySelectorAll('.vote-btn').forEach(btn => {
        btn.classList.toggle('voted-up', newDir === 'up' && btn.dataset.vote === 'up');
        btn.classList.toggle('voted-down', newDir === 'down' && btn.dataset.vote === 'down');
      });
    }
    if (AppState.currentView === 'post' && AppState.currentPostId === postId) this._updateDetailVote(postId);
  },

  _updateDetailVote(postId) {
    const p = Data.post(postId); if (!p) return;
    const uv = Data.getVote('p', postId);
    const u = document.querySelector('.vote-bar-btn:not(.down)');
    const d = document.querySelector('.vote-bar-btn.down');
    if (u) { u.innerHTML = `▲ 추천 ${p.upvotes}`; u.className = `vote-bar-btn${uv==='up'?' voted':''}`; }
    if (d) { d.innerHTML = `▼ 비추천 ${p.downvotes}`; d.className = `vote-bar-btn down${uv==='down'?' voted':''}`; }
  },

  voteComment(id) {
    if (!AppState.user.nickname) { toast('닉네임을 먼저 설정하세요'); return; }
    const c = AppState.comments.find(x => x.id === id); if (!c) return;
    if (Data.getVote('c', id)) { toast('이미 추천했습니다'); return; }
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
                  <div class="hot-post-meta">▲ ${p.upvotes - p.downvotes} · 💬 ${p.commentCount||0}</div>
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
            <div class="widget-body" style="padding:12px 16px;font-size:13px;line-height:1.7;color:var(--text-muted)">
              서로를 존중하고 따뜻한 커뮤니티를 만들어요.<br>
              욕설, 혐오 발언은 삼가해 주세요.<br><br>
              <button class="btn-primary" style="width:100%;border-radius:4px" onclick="document.getElementById('writeBtn').click()">✏️ 글쓰기</button>
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
          <div class="post-detail-footer">
            <div class="vote-bar">
              <button class="vote-bar-btn${uv==='up'?' voted':''}" id="dvUp">▲ 추천 ${post.upvotes}</button>
              <button class="vote-bar-btn down${uv==='down'?' voted':''}" id="dvDown">▼ 비추천 ${post.downvotes}</button>
            </div>
            <button class="post-action-btn" onclick="App.share('${post.id}')">🔗 공유</button>
            <button class="post-action-btn" onclick="history.back()">◀ 목록</button>
          </div>
        </div>
        <div class="comments-section">
          <div class="comments-header" id="cmHeader">댓글 ${comments.length}개</div>
          <div class="comment-form">
            <textarea class="comment-textarea" id="cmText" placeholder="${AppState.user.nickname ? '댓글을 작성하세요...' : '닉네임을 설정하면 댓글을 달 수 있어요!'}"></textarea>
            <div class="comment-form-actions"><button class="btn-primary" id="cmSubmit">댓글 작성</button></div>
          </div>
          <div id="cmList">
            ${comments.length
              ? comments.map(commentItem).join('')
              : '<div style="text-align:center;padding:32px;color:var(--text-muted)">첫 번째 댓글을 작성해보세요!</div>'}
          </div>
        </div>
      </div>`;

    document.getElementById('dvUp').addEventListener('click', () => this.votePost(postId, 'up'));
    document.getElementById('dvDown').addEventListener('click', () => this.votePost(postId, 'down'));
    document.getElementById('cmSubmit').addEventListener('click', () => {
      if (!AppState.user.nickname) { toast('닉네임을 먼저 설정하세요'); this.showNickModal(); return; }
      const text = document.getElementById('cmText').value.trim();
      if (!text) { toast('댓글 내용을 입력하세요'); return; }
      const c = Data.addComment({ postId, content: text, author: AppState.user.nickname });
      document.getElementById('cmText').value = '';
      const list = document.getElementById('cmList');
      if (list.querySelector('[style]')) list.innerHTML = '';
      list.insertAdjacentHTML('beforeend', commentItem(c));
      const cnt = AppState.comments.filter(x => x.postId === postId).length;
      document.getElementById('cmHeader').textContent = `댓글 ${cnt}개`;
      toast('댓글이 등록되었습니다!');
    });
  },

  showWrite(boardId) {
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
          <div class="write-actions">
            <button class="btn-outline" onclick="history.back()">취소</button>
            <button class="btn-primary" id="wSubmit">게시하기</button>
          </div>
        </div>
      </div>`;
    document.getElementById('wSubmit').addEventListener('click', () => {
      if (!AppState.user.nickname) { toast('닉네임을 먼저 설정하세요'); this.showNickModal(); return; }
      const bid = document.getElementById('wBoard').value;
      const title = document.getElementById('wTitle').value.trim();
      const content = document.getElementById('wContent').value.trim();
      if (!title) { toast('제목을 입력하세요'); return; }
      if (!content) { toast('내용을 입력하세요'); return; }
      const p = Data.addPost({ boardId: bid, title, content, author: AppState.user.nickname });
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
};

document.addEventListener('DOMContentLoaded', () => App.init());
