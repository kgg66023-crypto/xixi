/* ═══════════════════════════════════════════
   i18n — 中英文语言包
   ═══════════════════════════════════════════ */
const i18n = {
  zh: {
    // 导航
    'nav.experience': '个人经历',
    'nav.works': '工作成果',
    'nav.ai': 'AI创作',
    'nav.surprise': '惊喜盲盒',
    'nav.contact': '联系方式',

    // 首屏
    'hero.title': 'Know about 西西',
    'hero.subtitle': '1 person + AI = 灵感无限',
    'hero.desc1': '游荡AI探索中的好奇者',
    'hero.desc2': '希望我微不足道的idea，能够点亮你的某些想法',
    'hero.badge': 'ISFJ & AI Native探索者',

    // 个人经历
    'experience.title': '个人经历',
    'experience.subtitle': '来人间一趟，想多收集一些"哈哈哈哈哈"',
    'exp.zte.title': '中兴通讯股份有限公司 · 品牌策划经理',
    'exp.zte.li1': '<strong>项目负责人（Flip2上市）：</strong>主导努比亚Flip2的新品上市传播策划与项目落地，实现品牌声量、抖音传播指数与电商访客的有效联动。抖音话题#努比亚Flip2播放量已达<strong>1.6亿</strong>，抖音传播指数达<strong>年度峰值</strong>。<span class="view-media-badge" data-preview="assets/xuanfu1.png">📊 抖音指数</span>',
    'exp.zte.li2': '<strong>跨界营销：</strong>推动"中兴x努比亚成为苏超官方赞助商"跨界足球赞助项目的官方物料制作+外围传播，通过落地执行官方社媒+外围内容的热点策划，将合作权益转化为大众可感知、可讨论、可共鸣的<strong>品牌破圈声量</strong>。<span class="view-media-badge" data-preview="assets/xuanfu2.jpg">📸 苏超现场照</span>',
    'exp.zte.li3': '<strong>投放策略：</strong>配合努比亚Z80Ultra、Z70SUltra摄影师版、Flip2等新品上市节奏，主导抖音、微博等信息流广告投放策略优化。沉淀投放数据模型，为品牌<strong>长期投流策略</strong>提供决策依据。',
    'exp.zte.li4': '<strong>创作者运营：</strong>从0到1搭建品牌官方KOC创作者团队，招募核心创作者<span class="hl">500+人</span>，覆盖数码、摄影、生活方式等垂直领域。单篇最高互动<span class="hl">50W+</span>，曝光最高超<span class="hl">2000W+</span>，带动电商店铺进店UV增长<span class="hl">30%</span>。',
    'exp.shu.title': '上海大学 · 新闻传播学硕士',
    'exp.shu.meta': '🏆 成果：在读期间发表中文核心期刊论文1篇',
    'exp.xhs.title': '小红书 · 短视频运营实习 <span class="intern-badge">🎓 实习经历</span>',
    'exp.xhs.li1': '📹 独立策划&制作短视频<span class="hl">400+</span>，设计宣传海报70+，内容曝光覆盖百万级用户池。',
    'exp.xhs.li2': '📈 实现社区拉新<span class="hl">3W+</span>，激活用户8000+，视频渠道注册转化率突破<span class="hl">40%</span>，远超同期均值。<span class="view-media-badge" data-preview="assets/xiaohongs1.jpg">📈 小红书实习</span>',
    'exp.xhs.li3': '⚙️ 深度参与选题策略与爆款复制逻辑，搭建素材模板提升内容生产效率<span class="hl">30%</span>。',
    'exp.yicai.title': '上海第一财经数据科技有限公司 · 品牌内容运营实习 <span class="intern-badge">🎓 实习经历</span>',
    'exp.yicai.li1': '📖 运营原创IP"路塔塔"，策划跨平台内容（双微/知乎/小红书），累计阅读量<span class="hl">5W+</span>，粉丝互动率提升<span class="hl">27%</span>。',
    'exp.yicai.li2': '🏷️ 参与"寻找下一个C位新货架"线下沙龙全流程组织，协助品牌方对接及传播物料统筹。',
    'exp.yicai.li3': '📊 分析站内内容数据，输出周报优化选题方向，推动内容传播效率增长。',
    'exp.ncu.title': '南昌大学 · 广播电视学本科',
    'exp.ncu.meta': '🎯 GPA专业前5%；多次获得南昌大学特等奖学金、一等奖学金、"优秀学生干部"、"优秀毕业生"等荣誉称号。',
    'exp.aolang.title': '南昌奥朗广告 · 新媒体运营实习 <span class="intern-badge">🎓 实习经历</span>',
    'exp.aolang.li1': '✍️ 独立撰写品牌营销文章<span class="hl">20+篇</span>，运营官方微博累计发布400条内容，全网曝光量超<span class="hl">20W+</span>。',
    'exp.aolang.li2': '🤝 成功拓展小龙坎、CoCo都可等品牌合作，对接KOL资源并撰写商务策划案。',
    'exp.aolang.li3': '📈 通过热点话题策划增加粉丝互动，账号月互动率提升<span class="hl">45%</span>。',
    'exp.tv.title': '江西南昌电视台 · 实习记者 <span class="intern-badge">🎓 实习经历</span>',
    'exp.tv.li1': '🎤 负责《每日新闻》栏目采编，独立完成电视新闻采编<span class="hl">20余条</span>，其中<span class="hl">3条</span>被省级新闻频道采用。',
    'exp.tv.li2': '📺 参与《观点》栏目专题策划，协助热点话题调研及嘉宾采访提纲撰写，提升栏目深度。',
    'exp.tv.li3': '🏅 锻炼了从选题到成片的全流程制作能力，获带教记者"高效执行力"评价。',

    // 工作成果
    'works.title': '工作成果',
    'works.subtitle': '正好做了点东西，刚好有人看到，哇~运气不错耶◍˃ᵕ˂◍ ！🚀',
    'works.1.title': '新品上市整合品牌传播策划',
    'works.1.desc': '<strong style="color: #564067; font-size: 1.08em;">主导努比亚Flip2等重点新品从预热、发布到上市的全程传播策略制定与项目落地。</strong>围绕"国民小折叠，真AI随声动"核心主张，锁定年轻潮流人群，策划线上线下整合营销事件。通过KOL评测和深耕小红书平台种草，构建差异化传播策略。同时参与努比亚Z70SUltra摄影师版、努比亚Z80Ultra等旗舰产品的上市方案策划',
    'works.2.title': '社交媒体矩阵账号运营',
    'works.2.desc': '负责中兴x努比亚官方微博、微信、抖音、小红书等社交<strong style="color: #564067; font-size: 1.08em;">账号体系的日常运营与内容建设。</strong>结合网络热点/行业趋势，通过图文、视频等多种形式产出内容，提升牛仔的粉丝黏性与互动活跃度。如12.3日结合小红书平台热梗"放生垃圾箱"选题强调努比亚Z80U及摄影套装的卖点优势，曝光50w+余次，互动5000+，有效涨粉互动提升近2000%',
    'works.3.title': '效果广告投放与商业话题运营',
    'works.3.desc': '配合努比亚Z80Ultra、努比亚Flip2等旗舰新品上市，主导抖音、微博等<strong style="color: #564067; font-size: 1.08em;">信息流广告投放策略，</strong>同时搭建努比亚Flip2、Z80U等新品的商业话题、热搜话题，增加产品流量曝光与入口，累计信息流推广曝光约增加8000W+。同时通过人群定向、信息流A&B测试，持续降低投放成本，并<strong style="color: #564067; font-size: 1.08em;">获取产品优势卖点的有效信息。</strong>',
    'works.4.title': '热点借势营销',
    'works.4.desc': '从"快速响应"到"主动造势"——及时监测社会、数码行业及跨圈层热点，快速响应并策划努比亚品牌热点传播，借势提升努比亚Z80U产品曝光与话题参与度。<strong style="color: #d4789c; font-size: 1.08em; background: rgba(212, 120, 156, 0.15); padding: 1px 6px; border-radius: 4px;">借势升级：</strong>快速跟进社会相关热点话题，思考与产品本身卖点的结合点，实现"蹭热点"到"成为热点一部分"的跨越。如打造"努比亚Flip2才是人人买得起的小折叠"。<strong style="color: #d4789c; font-size: 1.08em; background: rgba(212, 120, 156, 0.15); padding: 1px 6px; border-radius: 4px;">话题主动造势：</strong>借助中兴x努比亚成为苏超官方赞助商的背景，策划南京场直播送周边礼包、努比亚女孩惊现苏超现场等热点内容，实现破圈传播。',
    'works.1.m1v': '全程',
    'works.1.m1l': '传播策略',
    'works.1.m2v': '3+',
    'works.1.m2l': '旗舰产品',
    'works.2.m1v': '50w+',
    'works.2.m1l': '曝光量',
    'works.2.m2v': '2000%',
    'works.2.m2l': '互动提升',
    'works.3.m1v': '8000W+',
    'works.3.m1l': '累计曝光',
    'works.3.m2v': 'A/B',
    'works.3.m2l': '持续优化',
    'works.4.m1v': '破圈',
    'works.4.m1l': '传播效果',
    'works.4.m2v': '主动',
    'works.4.m2l': '造势策略',

    // AI创作
    'ai.title': 'AI创作',
    'ai.subtitle': '1 person + AI = 无限可能',
    'ai.viewpoint.title': '观点',
    'ai.viewpoint.desc': '📓AI是杠杆，拓展了灵感&创意的上限，擅长把不可思议变为可能，但创意的价值并不在于\'机械生成\'🐰。毕竟AI永远无法脱离人类的脑子和认知，机器不能替代和决定的那些东西，那才是人类真正价值所在🍺。',
    'ai.miniapp.title': '小程序效果/功能展示',
    'ai.video.title': 'AI创作视频展示',
    'ai.coming': '即将上线 ✨',

    // 捕获野生西西墙
    'safari.title': '✨捕获野生西西墙✨',
    'safari.subtitle': '看准时机🍧！从下方传送带<strong>按住并向上</strong>抽取一张形态，去击碎满屏的彩虹泡泡🫧！',

    // 爆款内容中台
    'feed.title': '✨ 爆款内容中台',
    'feed.hint': '💡 点击卡片跳转小红书/抖音链接 · 点击爱心可点赞/取消',
    'feed.body': '品牌策划、新媒体运营、广告投放、创作者矩阵的搭建等等，这些看似独立的"术"，其<strong>本质都在服务于品牌传播</strong>。最终目标：既是品牌流量的曝光与突围；也是如何对用户需求进行深度挖掘与精准回应，找到<strong>引发用户心绪的情绪锚点和痛点</strong>，进而与产品本身的强势卖点结合，最终通过合理的传播策划，占领品牌心智建设与资产增长的战略高地。',
    'feed.insight.label': '💡 核心洞察 (Insight)',
    'feed.insight.text': '回归产品本身，找准能够解决用户痛点、创造独特价值的产品卖点+差异化优势，"反常识"与"用户痛点"是击穿圈层的利器。',
    'feed.growth.label': '📈 增长复制 (Growth)',
    'feed.growth.text': '<strong>传播最大化=好的内容+正确的渠道+把控传播节奏</strong>',

    // 惊喜盲盒
    'surprise.title': '🎁 惊喜盲盒',
    'surprise.subtitle': '👉 点击下方任意卡牌，瞬间解锁西西的神秘隐藏属性',
    'surprise.1.title': '💥 爆款内容制造机',
    'surprise.1.desc': '在网络的碎片信息中精准捕捉热点，用网感嗅觉撬动流量杠杆，让多条视频成为现象级传播，抖音千万播放+小红书百万播放达成者。从编导、选题到策划、打光、拍摄、剪辑，全流程一部手机就能搞定！',
    'surprise.2.title': '♍ 处女座 + ISFJ 支点',
    'surprise.2.desc': '在严格的细节控与完美服务型人格之间，永远用无懈可击的全面计划抵御现实的无序与混乱。',
    'surprise.3.title': '🔋 好奇心永动机',
    'surprise.3.desc': '永远敏锐聚焦最新前沿动态，把天马行空转化为强执行力，在未知领域快节奏试错！',
    'surprise.4.title': '🥑 稳定卡皮巴拉状态',
    'surprise.4.desc': '日常情绪维持一种低饱和的稳定状态，有点像卡皮巴拉。',
    'surprise.5.title': '🎮 英雄联盟·多赛季大师',
    'surprise.5.desc': '高压激烈对局中时刻能保持极端清醒，操作与大局观拉满，极强抗压韧性，是绝对的长期主义者。',
    'surprise.6.title': '✨ 此人美商极高',
    'surprise.6.desc': '对视觉构图和色彩体系拥有绝佳的直觉。尽管非专业摄影师，但日常产出天然叠满审美出片Buff！',
    'surprise.7.title': '🌳 公园是天然氧吧',
    'surprise.7.desc': '低能量时喜欢逛公园，超爱拥抱大树的！从树木中汲取能量，自我调节水平已经是next level了！',

    // 联系方式
    'contact.title': '联系方式',
    'contact.subtitle': '期待与你相遇',
    'contact.email.label': '邮箱',
    'contact.phone.label': '电话',

    // 页脚
    'footer.text': 'Made with curiosity & AI',
  },

  en: {
    // Nav
    'nav.experience': 'Experience',
    'nav.works': 'Works',
    'nav.ai': 'AI Creation',
    'nav.surprise': 'Surprise',
    'nav.contact': 'Contact',

    // Hero
    'hero.title': 'Know about XiXi',
    'hero.subtitle': '1 person + AI = Infinite Inspiration',
    'hero.desc1': 'A curious explorer wandering in the AI realm',
    'hero.desc2': 'Hope my humble ideas can spark something in you',
    'hero.badge': 'ISFJ & AI Native Explorer',

    // Experience
    'experience.title': 'Experience',
    'experience.subtitle': 'Here to collect more "hahaha" in this lifetime',
    'exp.zte.title': 'ZTE Communications · Brand Planning Manager',
    'exp.zte.li1': '<strong>Project Lead (Flip2 Launch):</strong> Led end-to-end communication strategy for nubia Flip2, achieving effective linkage between brand awareness, Douyin engagement index and e-commerce traffic. Douyin topic #nubiaFlip2 reached <strong>160M+ plays</strong>, with Douyin engagement index at <strong>annual peak</strong>.<span class="view-media-badge" data-preview="assets/xuanfu1.png">📊 Douyin Index</span>',
    'exp.zte.li2': '<strong>Cross-industry Marketing:</strong> Drove "ZTE × nubia as Su Super League official sponsor" project — official materials production and external communication, converting sponsorship rights into <strong>brand-breaking awareness</strong> that audiences could perceive, discuss and resonate with.<span class="view-media-badge" data-preview="assets/xuanfu2.jpg">📸 Su League On-site</span>',
    'exp.zte.li3': '<strong>Ad Strategy:</strong> Led feed ad strategy optimization on Douyin and Weibo for nubia Z80Ultra, Z70SUltra Photographer Edition, Flip2 and other product launches. Built ad data models to inform <strong>long-term ad investment strategy</strong>.',
    'exp.zte.li4': '<strong>Creator Operations:</strong> Built brand KOC creator team from 0 to 1, recruiting <span class="hl">500+ core creators</span> across tech, photography and lifestyle verticals. Max single-post engagement <span class="hl">500K+</span>, max exposure <span class="hl">20M+</span>, driving e-commerce store UV growth of <span class="hl">30%</span>.',
    'exp.shu.title': 'Shanghai University · M.A. in Journalism & Communication',
    'exp.shu.meta': '🏆 Achievement: Published one paper in a Chinese core journal during studies',
    'exp.xhs.title': 'Xiaohongshu (RED) · Short Video Operations Intern <span class="intern-badge">🎓 Internship</span>',
    'exp.xhs.li1': '📹 Independently planned & produced <span class="hl">400+ short videos</span>, designed 70+ promotional posters, content exposure covering millions of users.',
    'exp.xhs.li2': '📈 Achieved community acquisition of <span class="hl">30K+</span>, activated 8K+ users, video channel registration conversion rate exceeded <span class="hl">40%</span>, far above average.<span class="view-media-badge" data-preview="assets/xiaohongs1.jpg">📈 Xiaohongshu Intern</span>',
    'exp.xhs.li3': '⚙️ Deeply engaging in topic strategy and viral content replication logic, built template systems to improve content production efficiency by <span class="hl">30%</span>.',
    'exp.yicai.title': 'Shanghai Yicai Data & Tech · Brand Content Operations Intern <span class="intern-badge">🎓 Internship</span>',
    'exp.yicai.li1': '📖 Operated original IP "Lutata", planned cross-platform content (WeChat/Weibo/Zhihu/Xiaohongshu), accumulated <span class="hl">50K+</span> reads, fan engagement rate increased by <span class="hl">27%</span>.',
    'exp.yicai.li2': '🏷️ Participated in full-process organization of "Find the Next C-Position Shelf" offline salon, assisting brand partner coordination and communication materials.',
    'exp.yicai.li3': '📊 Analyzed on-site content data, produced weekly reports to optimize topic direction, driving content communication efficiency growth.',
    'exp.ncu.title': 'Nanchang University · B.A. in Broadcasting & Television',
    'exp.ncu.meta': '🎯 Top 5% GPA; Multiple Special Scholarships, First-Class Scholarships, "Outstanding Student Leader", "Outstanding Graduate" honors.',
    'exp.aolang.title': 'Nanchang Aolang Advertising · New Media Operations Intern <span class="intern-badge">🎓 Internship</span>',
    'exp.aolang.li1': '✍️ Independently wrote <span class="hl">20+ marketing articles</span>, operated official Weibo with 400 posts, total exposure exceeding <span class="hl">200K+</span>.',
    'exp.aolang.li2': '🤝 Successfully expanded brand collaborations with Xiaolongkan, CoCo, etc., coordinated KOL resources and wrote business proposals.',
    'exp.aolang.li3': '📈 Increased fan engagement through trending topic planning, monthly account interaction rate improved by <span class="hl">45%</span>.',
    'exp.tv.title': 'Nanchang TV Station · Intern Reporter <span class="intern-badge">🎓 Internship</span>',
    'exp.tv.li1': '🎤 Produced content for "Daily News" program, independently edited <span class="hl">20+ TV news segments</span>, of which <span class="hl">3</span> were adopted by provincial news channels.',
    'exp.tv.li2': '📺 Participated in "Perspectives" column topic planning, assisted in hot topic research and guest interview outline preparation.',
    'exp.tv.li3': '🏅 Developed full-process production skills from topic selection to final cut, received "High Efficiency Execution" evaluation from mentor.',

    // Works
    'works.title': 'Works',
    'works.subtitle': 'Made some stuff, someone noticed — wow, lucky me! 🍀🚀',
    'works.1.title': 'Integrated Brand Launch Campaigns',
    'works.1.desc': '<strong style="color: #564067; font-size: 1.08em;">Led end-to-end communication strategy for nubia Flip2 and other flagship products — from pre-launch hype to market release.</strong> Crafted the core message "People\'s Foldable, True AI in Motion", targeting young trend-conscious audiences with integrated online-offline marketing. Built differentiated strategies through KOL reviews and deep Xiaohongshu seeding. Also contributed to nubia Z70S Ultra Photographer Edition and Z80 Ultra launch plans.',
    'works.2.title': 'Social Media Matrix Operations',
    'works.2.desc': 'Managed daily operations across ZTE × nubia\'s official Weibo, WeChat, Douyin, and Xiaohongshu <strong style="color: #564067; font-size: 1.08em;">social media matrix and content building.</strong> Combined trending topics with industry insights to produce multi-format content that boosted fan engagement. For example, leveraged the Xiaohongshu meme "Releasing Trash Cans" to highlight the Z80U camera kit\'s selling points, achieving 500K+ impressions and 5000+ interactions.',
    'works.3.title': 'Performance Ads & Commercial Topics',
    'works.3.desc': 'Led Douyin and Weibo <strong style="color: #564067; font-size: 1.08em;">feed ad strategies</strong> for nubia Z80Ultra and Flip2 launches, while building commercial and trending topics to maximize traffic exposure, accumulating 80M+ ad impressions. Applied audience targeting and A/B testing to continuously reduce costs and <strong style="color: #564067; font-size: 1.08em;">gather effective product selling insights.</strong>',
    'works.4.title': 'Trend-jacking Marketing',
    'works.4.desc': 'Evolved from "rapid response" to "proactive buzz creation" — monitoring social and industry trends to craft timely brand moments for nubia Z80U.<strong style="color: #d4789c; font-size: 1.08em; background: rgba(212, 120, 156, 0.15); padding: 1px 6px; border-radius: 4px;">Trend Upgrade:</strong> Rapidly followed trending topics, combining them with product selling points to shift from "蹭热点" to "becoming part of the trend". Created the "nubia Flip2 is the truly affordable foldable" narrative.<strong style="color: #d4789c; font-size: 1.08em; background: rgba(212, 120, 156, 0.15); padding: 1px 6px; border-radius: 4px;">Proactive Buzz:</strong> Leveraged ZTE × nubia\'s Su Super League sponsorship to plan live-stream giveaways and on-site content, achieving cross-circle virality.',
    'works.1.m1v': 'End-to-End',
    'works.1.m1l': 'Comm Strategy',
    'works.1.m2v': '3+',
    'works.1.m2l': 'Flagships',
    'works.2.m1v': '50w+',
    'works.2.m1l': 'Impressions',
    'works.2.m2v': '2000%',
    'works.2.m2l': 'Engagement',
    'works.3.m1v': '80M+',
    'works.3.m1l': 'Ad Impressions',
    'works.3.m2v': 'A/B',
    'works.3.m2l': 'Optimization',
    'works.4.m1v': 'Cross-circle',
    'works.4.m1l': 'Virality',
    'works.4.m2v': 'Proactive',
    'works.4.m2l': 'Buzz Strategy',

    // AI Creation
    'ai.title': 'AI Creation',
    'ai.subtitle': '1 person + AI = Infinite Possibilities',
    'ai.viewpoint.title': 'My Take',
    'ai.viewpoint.desc': '📓AI is a lever that expands the ceiling of inspiration & creativity — it excels at making the impossible possible, but creative value isn\'t about "mechanical generation" 🐰. After all, AI can never detach from the human mind and cognition. What machines can\'t replace or decide — that\'s where true human value lies 🍺.',
    'ai.miniapp.title': 'Mini-App Demo',
    'ai.video.title': 'AI Video Showcase',
    'ai.coming': 'Coming Soon ✨',

    // Safari
    'safari.title': '✨ Catch Wild XiXi Wall ✨',
    'safari.subtitle': 'Time it right 🍧! <strong>Press and drag up</strong> a card from the conveyor belt below to smash the rainbow bubbles 🫧!',

    // Feed
    'feed.title': '✨ Viral Content Hub',
    'feed.hint': '💡 Click cards to visit Xiaohongshu/Douyin · Click heart to like/unlike',
    'feed.body': 'Brand planning, new media operations, ad placement, creator matrix building — these seemingly independent "tactics" all <strong>serve brand communication</strong>. The ultimate goal: both brand traffic exposure and breakthrough; and deeply exploring user needs for precise response, finding <strong>emotional anchors and pain points</strong> that resonate with users, combined with product strengths, ultimately seizing brand mindshare and asset growth through strategic communication planning.',
    'feed.insight.label': '💡 Core Insight',
    'feed.insight.text': 'Return to the product itself, find selling points + differentiated advantages that solve user pain points and create unique value. "Counter-intuitive" and "user pain points" are the weapons to break through circle barriers.',
    'feed.growth.label': '📈 Growth Replication',
    'feed.growth.text': '<strong>Max Communication = Great Content + Right Channels + Rhythm Control</strong>',

    // Surprise
    'surprise.title': '🎁 Surprise',
    'surprise.subtitle': '👉 Click any card to unlock XiXi\'s hidden attributes',
    'surprise.1.title': '💥 Viral Content Machine',
    'surprise.1.desc': 'Precisely capturing hot trends from fragmented online info, leveraging internet instinct to drive traffic — making multiple videos go viral, achieving Douyin 10M+ plays and Xiaohongshu 1M+ plays. From directing, topic selection to planning, lighting, shooting and editing — all done with just one phone!',
    'surprise.2.title': '♍ Virgo + ISFJ Anchor',
    'surprise.2.desc': 'Between strict perfectionism and service-oriented personality, always using impeccable planning to resist the chaos of reality.',
    'surprise.3.title': '🔋 Curiosity Engine',
    'surprise.3.desc': 'Always acutely focused on the latest cutting-edge trends, transforming wild ideas into strong execution, rapid trial-and-error in unknown territories!',
    'surprise.4.title': '🥑 Stable Capybara State',
    'surprise.4.desc': 'Daily emotions maintained at a low-saturation stable state, kind of like a capybara.',
    'surprise.5.title': '🎮 LoL Multi-Season Master',
    'surprise.5.desc': 'Maintaining extreme clarity in intense high-pressure matches, mechanics and macro at max, extreme resilience — a true long-termist.',
    'surprise.6.title': '✨ Exceptional Aesthetic Sense',
    'surprise.6.desc': 'Possessing excellent intuition for visual composition and color systems. Though not a professional photographer, daily output naturally stacks aesthetic shooting buffs!',
    'surprise.7.title': '🌳 Parks Are My Natural Charger',
    'surprise.7.desc': 'When energy runs low, I love strolling through parks — absolutely love hugging trees! Drawing energy from nature, self-regulation skills are already at next level!',

    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Looking forward to connecting',
    'contact.email.label': 'Email',
    'contact.phone.label': 'Phone',

    // Footer
    'footer.text': 'Made with curiosity & AI',
  },
};

/**
 * 获取当前语言
 */
function getCurrentLang() {
  return document.documentElement.getAttribute('data-lang') || 'zh';
}

/**
 * 设置语言
 */
function setLanguage(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  const dict = i18n[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      if (dict[key].includes('<')) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // 更新 lang toggle label
  const langLabel = document.querySelector('.lang-label');
  if (langLabel) {
    langLabel.textContent = lang === 'zh' ? 'EN' : '中';
  }

  // 更新 html lang 属性
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // 更新打字机文案
  if (window.typewriterInstance) {
    window.typewriterInstance.restart();
  }

  // 重新绑定悬浮预览事件（innerHTML 替换后事件丢失）
  if (typeof window.rebindHoverPreview === 'function') {
    window.rebindHoverPreview();
  }
}

/**
 * 切换语言
 */
function toggleLanguage() {
  const current = getCurrentLang();
  const next = current === 'zh' ? 'en' : 'zh';
  setLanguage(next);
}
