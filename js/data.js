/* ============================================================
   UniMatch — mock data layer (v2, expanded)
   Figures are illustrative placeholders curated for realism,
   not a live feed. Swap in a real data source / API for production.
============================================================ */

/* ---------- Global universities ---------- */
const UNIVERSITIES = [
  // ---- USA ----
  { id:"mit", name:"Massachusetts Institute of Technology", country:"United States", city:"Cambridge, MA", tuition:59750, living:21000, qs:1, the:2, usnews:2, arwu:3, employer:99, fields:["computer-science","engineering","ai-ml","physics"], scholarship:"Need-blind, up to 100%", tags:["STEM powerhouse","Need-blind aid"], scholarshipTypes:["full-ride","full-waiver","partial"] },
  { id:"stanford", name:"Stanford University", country:"United States", city:"Stanford, CA", tuition:62400, living:24000, qs:5, the:3, usnews:4, arwu:2, employer:98, fields:["computer-science","ai-ml","business","engineering"], scholarship:"Stanford Financial Aid", tags:["Silicon Valley access","Entrepreneurship"], scholarshipTypes:["full-ride","full-waiver","partial"] },
  { id:"harvard", name:"Harvard University", country:"United States", city:"Cambridge, MA", tuition:56550, living:22000, qs:4, the:4, usnews:3, arwu:1, employer:99, fields:["law","medicine","economics","business"], scholarship:"Need-based, no loans", tags:["Global brand","Deep endowment"], scholarshipTypes:["full-ride","full-waiver","partial"] },
  { id:"cmu", name:"Carnegie Mellon University", country:"United States", city:"Pittsburgh, PA", tuition:60500, living:18500, qs:52, the:22, usnews:24, arwu:47, employer:95, fields:["computer-science","ai-ml","engineering"], scholarship:"Dean's Scholarship", tags:["Top-3 world CS","Robotics hub"], scholarshipTypes:["partial","full-waiver"] },
  { id:"umich", name:"University of Michigan, Ann Arbor", country:"United States", city:"Ann Arbor, MI", tuition:53200, living:16500, qs:44, the:33, usnews:21, arwu:23, employer:92, fields:["engineering","business","medicine"], scholarship:"Go Blue Guarantee", tags:["Big public flagship","Strong alumni network"], scholarshipTypes:["partial"] },
  // ---- United Kingdom ----
  { id:"oxford", name:"University of Oxford", country:"United Kingdom", city:"Oxford", tuition:41000, living:15500, qs:3, the:1, usnews:5, arwu:7, employer:97, fields:["law","medicine","economics","ai-ml"], scholarship:"Rhodes & Reach Oxford", tags:["Tutorial system","Ancient colleges"], scholarshipTypes:["full-ride","partial"] },
  { id:"cambridge", name:"University of Cambridge", country:"United Kingdom", city:"Cambridge", tuition:40500, living:15000, qs:2, the:5, usnews:6, arwu:4, employer:96, fields:["engineering","physics","medicine","ai-ml"], scholarship:"Cambridge Trust", tags:["Supervision system","Deep research base"], scholarshipTypes:["full-ride","partial"] },
  { id:"imperial", name:"Imperial College London", country:"United Kingdom", city:"London", tuition:38000, living:16500, qs:2, the:9, usnews:20, arwu:24, employer:94, fields:["engineering","ai-ml","medicine","physics"], scholarship:"President's Scholarship", tags:["STEM-only focus","Central London"], scholarshipTypes:["partial","full-waiver"] },
  { id:"lse", name:"London School of Economics", country:"United Kingdom", city:"London", tuition:26208, living:17000, qs:45, the:37, usnews:80, arwu:151, employer:91, fields:["economics","law","business"], scholarship:"LSE Undergraduate Support", tags:["Social science elite","Global finance pipeline"], scholarshipTypes:["partial"] },
  { id:"ucl", name:"University College London", country:"United Kingdom", city:"London", tuition:33500, living:17000, qs:9, the:22, usnews:18, arwu:17, employer:93, fields:["engineering","medicine","arts","ai-ml"], scholarship:"UCL Global Undergraduate", tags:["Broadest faculty range","Central London"], scholarshipTypes:["partial","full-waiver"] },
  // ---- Germany ----
  { id:"tum", name:"Technical University of Munich", country:"Germany", city:"Munich", tuition:0, living:13500, qs:28, the:30, usnews:44, arwu:51, employer:90, fields:["engineering","computer-science","physics"], scholarship:"Deutschlandstipendium", tags:["No tuition fee","Industry-linked"], scholarshipTypes:["full-waiver","partial"] },
  { id:"lmu", name:"LMU Munich", country:"Germany", city:"Munich", tuition:0, living:13500, qs:59, the:36, usnews:65, arwu:47, employer:87, fields:["medicine","law","economics"], scholarship:"DAAD Scholarships", tags:["No tuition fee","Research heavyweight"], scholarshipTypes:["full-waiver","partial"] },
  { id:"rwth", name:"RWTH Aachen University", country:"Germany", city:"Aachen", tuition:0, living:11500, qs:106, the:114, usnews:130, arwu:151, employer:86, fields:["engineering","computer-science"], scholarship:"DAAD Scholarships", tags:["No tuition fee","Engineering-focused"], scholarshipTypes:["full-waiver","partial"] },
  { id:"kit", name:"Karlsruhe Institute of Technology", country:"Germany", city:"Karlsruhe", tuition:0, living:11000, qs:141, the:88, usnews:130, arwu:96, employer:83, fields:["engineering","computer-science","physics"], scholarship:"DAAD Scholarships", tags:["No tuition fee","Applied research"], scholarshipTypes:["full-waiver","partial"] },
  // ---- Hong Kong ----
  { id:"hku", name:"University of Hong Kong", country:"Hong Kong", city:"Hong Kong", tuition:22000, living:12500, qs:17, the:35, usnews:40, arwu:58, employer:88, fields:["business","law","medicine"], scholarship:"HKU Foundation", tags:["Finance hub access","Bilingual campus"], scholarshipTypes:["full-ride","partial"] },
  { id:"hkust", name:"HKUST", country:"Hong Kong", city:"Hong Kong", tuition:20800, living:12000, qs:47, the:60, usnews:74, arwu:89, employer:85, fields:["engineering","computer-science","business"], scholarship:"HKUST Undergraduate Scholarship", tags:["Young & fast-rising","Strong industry ties"], scholarshipTypes:["partial","full-waiver"] },
  { id:"cuhk", name:"Chinese University of Hong Kong", country:"Hong Kong", city:"Hong Kong", tuition:20300, living:11500, qs:36, the:53, usnews:78, arwu:101, employer:83, fields:["medicine","business","arts"], scholarship:"CUHK Vice-Chancellor's Award", tags:["Beautiful hillside campus","Broad faculty"], scholarshipTypes:["partial"] },
  // ---- Singapore ----
  { id:"nus", name:"National University of Singapore", country:"Singapore", city:"Singapore", tuition:29000, living:12000, qs:8, the:19, usnews:26, arwu:68, employer:92, fields:["computer-science","business","engineering"], scholarship:"ASEAN & Merit awards", tags:["Asia's top campus","Strong industry ties"], scholarshipTypes:["full-ride","partial"] },
  { id:"ntu", name:"Nanyang Technological University", country:"Singapore", city:"Singapore", tuition:27500, living:11500, qs:15, the:26, usnews:41, arwu:77, employer:88, fields:["engineering","computer-science","business"], scholarship:"NTU Merit Scholarship", tags:["Smart-campus tech","Strong co-op"], scholarshipTypes:["partial","full-waiver"] },
  { id:"smu", name:"Singapore Management University", country:"Singapore", city:"Singapore", tuition:31000, living:12500, qs:511, the:601, usnews:701, arwu:801, employer:78, fields:["business","law","economics"], scholarship:"SMU Merit Scholarship", tags:["Seminar-style teaching","City-campus"], scholarshipTypes:["partial"] },
  // ---- Canada ----
  { id:"utoronto", name:"University of Toronto", country:"Canada", city:"Toronto", tuition:45000, living:16000, qs:21, the:18, usnews:15, arwu:21, employer:89, fields:["computer-science","medicine","business"], scholarship:"Lester B. Pearson", tags:["PR pathway","Research heavyweight"], scholarshipTypes:["partial","full-waiver"] },
  { id:"ubc", name:"University of British Columbia", country:"Canada", city:"Vancouver", tuition:41500, living:16500, qs:34, the:41, usnews:33, arwu:37, employer:85, fields:["engineering","arts","business"], scholarship:"International Major Entrance", tags:["PR pathway","Coastal campus"], scholarshipTypes:["partial"] },
  { id:"mcgill", name:"McGill University", country:"Canada", city:"Montreal", tuition:32000, living:13500, qs:30, the:44, usnews:38, arwu:62, employer:86, fields:["medicine","arts","business"], scholarship:"Major Entrance Scholarship", tags:["Affordable living","Bilingual city"], scholarshipTypes:["partial","full-waiver"] },
  { id:"uwaterloo", name:"University of Waterloo", country:"Canada", city:"Waterloo", tuition:38500, living:14000, qs:112, the:201, usnews:191, arwu:201, employer:88, fields:["computer-science","engineering"], scholarship:"President's Scholarship", tags:["Co-op powerhouse","Startup pipeline"], scholarshipTypes:["partial"] },
  // ---- Japan ----
  { id:"utokyo", name:"University of Tokyo", country:"Japan", city:"Tokyo", tuition:5300, living:14500, qs:32, the:29, usnews:73, arwu:23, employer:84, fields:["engineering","physics","economics"], scholarship:"MEXT Scholarship", tags:["Low tuition","National flagship"], scholarshipTypes:["full-waiver","partial"] },
  { id:"kyoto", name:"Kyoto University", country:"Japan", city:"Kyoto", tuition:5300, living:12500, qs:44, the:55, usnews:96, arwu:35, employer:80, fields:["physics","medicine","engineering"], scholarship:"MEXT Scholarship", tags:["Low tuition","Nobel-laureate legacy"], scholarshipTypes:["full-waiver","partial"] },
  { id:"titech", name:"Tokyo Institute of Technology", country:"Japan", city:"Tokyo", tuition:5300, living:14000, qs:91, the:141, usnews:251, arwu:151, employer:76, fields:["engineering","computer-science"], scholarship:"MEXT Scholarship", tags:["Low tuition","Engineering specialist"], scholarshipTypes:["full-waiver","partial"] },
  // ---- Australia ----
  { id:"unimelb", name:"University of Melbourne", country:"Australia", city:"Melbourne", tuition:34000, living:17500, qs:13, the:16, usnews:22, arwu:34, employer:90, fields:["medicine","business","arts","law"], scholarship:"Melbourne Global Scholars", tags:["Broad curriculum","Post-study work visa"], scholarshipTypes:["partial","full-waiver"] },
  { id:"anu", name:"Australian National University", country:"Australia", city:"Canberra", tuition:31000, living:15000, qs:34, the:62, usnews:60, arwu:78, employer:82, fields:["economics","arts","physics"], scholarship:"ANU Chancellor's Award", tags:["Policy-focused","Small class sizes"], scholarshipTypes:["partial"] },];

/* ---------- Bangladeshi universities: tuition + employer reputation + prep resources ---------- */
const BD_UNIVERSITIES = [
  { name:"Bangladesh University of Engineering & Technology (BUET)", type:"Public", city:"Dhaka", tuitionPerYearBDT:8000, employer:96, admissionTest:"BUET Admission Test", notes:"Country's top engineering school; extremely competitive.",
    process:"BUET admission is a two-stage process: a preliminary screening (MCQ) test followed by a final written examination, both scored heavily on HSC-syllabus Physics, Chemistry, and Mathematics. Confirm your HSC GPA clears the minimum eligibility bar published in the official circular before applying, and prioritise past-paper practice for time management.",
    resources: [
      { name:"BUET Official Admission Portal", type:"Application", note:"Primary source for all official admission circulars, requirements, and application procedures.", url:"https://ugadmission.buet.ac.bd" },
      { name:"10 Minute School (YouTube)", type:"Test Prep", note:"Extensive video coverage of HSC Physics, Chemistry, and Mathematics — the core BUET admission-test subjects.", url:"https://www.youtube.com/@10minuteschool" },
      { name:"Khan Academy", type:"Test Prep", note:"Strong for fundamental calculus, physics, and chemistry concepts underlying engineering entrance exams.", url:"https://www.khanacademy.org" },
      { name:"Shikkha Batayan", type:"Test Prep", note:"Government-managed portal with digital content and textbooks aligned to the national curriculum.", url:"http://www.shikkhabatayon.gov.bd" },
    ] },
  { name:"University of Dhaka", type:"Public", city:"Dhaka", tuitionPerYearBDT:6000, employer:92, admissionTest:"DU Unit-based Test (A/B/C/D)", notes:"Oldest and most prestigious general university.",
    process:"DU admission runs through four unit-based tests (A: Science, B: Arts, C: Commerce, D: combined/social science) — each a single MCQ + written exam on your HSC-stream subjects. Only students clearing the minimum GPA cutoff for their unit may apply; seats are allocated by merit rank within each unit.",
    resources: [
      { name:"DU Admission Office Portal", type:"Application", note:"Official circulars, unit-wise eligibility, and the online application system.", url:"https://admission.eis.du.ac.bd" },
      { name:"10 Minute School (YouTube)", type:"Test Prep", note:"Unit-specific crash courses covering DU's MCQ and written formats.", url:"https://www.youtube.com/@10minuteschool" },
      { name:"Facebook DU Admission Help groups", type:"Community", note:"Active peer communities sharing past questions, seat-plan updates, and cutoff-mark trends each year.", url:"https://www.facebook.com" },
    ] },
  { name:"Institute of Business Administration, DU (IBA)", type:"Public", city:"Dhaka", tuitionPerYearBDT:65000, employer:95, admissionTest:"IBA Admission Test", notes:"Top-ranked business school in the country.",
    process:"IBA's process is written test (English, Math, Analytical Ability) followed by a viva voce for shortlisted candidates. The written round is the hardest filter — strong English comprehension and quantitative aptitude matter more than rote memorisation.",
    resources: [
      { name:"IBA, University of Dhaka — Official Site", type:"Application", note:"Circulars, eligibility, and the admission test syllabus breakdown.", url:"https://iba-du.edu.bd" },
      { name:"10 Minute School (YouTube)", type:"Test Prep", note:"IBA-specific English and Analytical Ability preparation series.", url:"https://www.youtube.com/@10minuteschool" },
      { name:"The College Panda — SAT Math", type:"Test Prep", note:"Strong quantitative-reasoning drills that transfer well to IBA's analytical section.", url:"https://thecollegepanda.com/categories/sat-math/" },
    ] },
  { name:"Bangladesh University of Professionals (BUP)", type:"Public", city:"Dhaka", tuitionPerYearBDT:45000, employer:83, admissionTest:"BUP Admission Test", notes:"Growing reputation, defense-affiliated governance.",
    process:"BUP holds faculty-specific written admission tests (Science, Business, Social Science, Arts & Law), each weighted toward HSC-syllabus subjects in that faculty. Physical fitness and medical screening apply for certain programs.",
    resources: [
      { name:"BUP Official Admission Site", type:"Application", note:"Faculty-wise circulars and eligibility criteria.", url:"https://bup.edu.bd" },
      { name:"10 Minute School (YouTube)", type:"Test Prep", note:"General HSC-syllabus revision series useful across BUP's faculty tests.", url:"https://www.youtube.com/@10minuteschool" },
    ] },
  { name:"North South University (NSU)", type:"Private", city:"Dhaka", tuitionPerYearBDT:420000, employer:82, admissionTest:"NSU Admission Test", notes:"Largest private university; strong CSE & BBA placement.",
    process:"NSU's own admission test covers English, Math/Analytical, and Writing, though strong SAT or O/A-Level results can waive it. Scholarship tiers are GPA-based and applied automatically at admission.",
    resources: [
      { name:"NSU Office of Admissions", type:"Application", note:"Circulars, waiver criteria, and the online application portal.", url:"https://www.northsouth.edu/admissions" },
      { name:"HuePrep — SAT Prep", type:"Test Prep", note:"Structured SAT prep that also satisfies NSU's test-waiver requirement.", url:"https://www.hueprep.com" },
      { name:"The College Panda — SAT Math", type:"Test Prep", note:"Targeted SAT Math practice sets and strategy guides.", url:"https://thecollegepanda.com/categories/sat-math/" },
    ] },
  { name:"BRAC University", type:"Private", city:"Dhaka", tuitionPerYearBDT:400000, employer:80, admissionTest:"BRACU Admission Test", notes:"Strong CS/architecture reputation, need-based aid available.",
    process:"BRACU's admission is grade/test-driven — strong HSC/A-Level results or SAT scores can waive the internal test. Need-based financial aid is assessed separately from academic merit, so apply for it explicitly.",
    resources: [
      { name:"BRAC University Admissions", type:"Application", note:"Circulars, waiver policy, and financial-aid application forms.", url:"https://www.bracu.ac.bd/admission" },
      { name:"HuePrep — SAT Prep", type:"Test Prep", note:"Full SAT curriculum for students aiming to waive BRACU's internal test.", url:"https://www.hueprep.com" },
    ] },
  { name:"Independent University, Bangladesh (IUB)", type:"Private", city:"Dhaka", tuitionPerYearBDT:380000, employer:74, admissionTest:"IUB Admission Test", notes:"Solid business & CS programs, smaller campus feel.",
    process:"IUB's admission test focuses on English and quantitative aptitude, with GPA-based merit scholarships awarded automatically at the point of admission.",
    resources: [
      { name:"IUB Admissions Office", type:"Application", note:"Circulars and the online application system.", url:"https://www.iub.edu.bd/admission" },
      { name:"10 Minute School (YouTube)", type:"Test Prep", note:"English and quantitative aptitude revision content.", url:"https://www.youtube.com/@10minuteschool" },
    ] },
  { name:"American International University-Bangladesh (AIUB)", type:"Private", city:"Dhaka", tuitionPerYearBDT:300000, employer:70, admissionTest:"AIUB Admission Test", notes:"Large CSE intake, flexible semester system.",
    process:"AIUB runs a rolling admission with an internal English/Math test, waivable with strong HSC/A-Level or SAT results — four intakes per year give flexibility on timing.",
    resources: [
      { name:"AIUB Admission Office", type:"Application", note:"Rolling intake dates and application requirements.", url:"https://www.aiub.edu/admission" },
      { name:"The College Panda — SAT Math", type:"Test Prep", note:"Useful for the quantitative portion of AIUB's placement test.", url:"https://thecollegepanda.com/categories/sat-math/" },
    ] },
  { name:"Bangladesh University of Textiles (BUTEX)", type:"Public", city:"Dhaka", tuitionPerYearBDT:10000, employer:79, admissionTest:"BUTEX Admission Test", notes:"Specialist textile engineering, strong RMG-sector placement.",
    process:"BUTEX's written admission test mirrors BUET's format but is scoped to Physics, Chemistry, and Math at a slightly less intense difficulty — strong HSC fundamentals are usually sufficient with focused practice.",
    resources: [
      { name:"BUTEX Admission Portal", type:"Application", note:"Circulars and test-format details.", url:"https://butex.edu.bd" },
      { name:"10 Minute School (YouTube)", type:"Test Prep", note:"HSC Physics/Chemistry/Math revision series.", url:"https://www.youtube.com/@10minuteschool" },
    ] },
  { name:"Chittagong University of Engineering & Technology (CUET)", type:"Public", city:"Chattogram", tuitionPerYearBDT:9000, employer:85, admissionTest:"CUET Admission Test", notes:"Leading engineering school outside Dhaka.",
    process:"CUET's single-stage written test covers Physics, Chemistry, and Math directly from the HSC syllabus — past-paper practice and time-boxed mock tests are the highest-leverage prep.",
    resources: [
      { name:"CUET Admission Portal", type:"Application", note:"Circulars and merit-list publication.", url:"https://cuet.ac.bd" },
      { name:"Khan Academy", type:"Test Prep", note:"Core calculus, physics, and chemistry concept review.", url:"https://www.khanacademy.org" },
    ] },
  { name:"Khulna University of Engineering & Technology (KUET)", type:"Public", city:"Khulna", tuitionPerYearBDT:9000, employer:83, admissionTest:"KUET Admission Test", notes:"Strong regional engineering reputation.",
    process:"KUET follows the same general engineering-admission pattern as CUET/BUET (HSC-syllabus Physics/Chemistry/Math), with its own separate seat plan and merit list.",
    resources: [
      { name:"KUET Admission Portal", type:"Application", note:"Circulars and application procedure.", url:"https://kuet.ac.bd" },
      { name:"10 Minute School (YouTube)", type:"Test Prep", note:"HSC-syllabus revision for the engineering-test cluster.", url:"https://www.youtube.com/@10minuteschool" },
    ] },
  { name:"Shahjalal University of Science & Technology (SUST)", type:"Public", city:"Sylhet", tuitionPerYearBDT:8500, employer:81, admissionTest:"SUST Admission Test", notes:"Known for CSE and a green residential campus.",
    process:"SUST's admission test is unit-based (Science/Engineering, Life Science, Social Science) with a mix of MCQ and written components on HSC-syllabus subjects for the relevant unit.",
    resources: [
      { name:"SUST Admission Portal", type:"Application", note:"Unit-wise circulars and eligibility.", url:"https://www.sust.edu/admission" },
      { name:"10 Minute School (YouTube)", type:"Test Prep", note:"HSC-syllabus revision series by unit.", url:"https://www.youtube.com/@10minuteschool" },
    ] },
];

/* ---------- Living cost baselines by destination (monthly, USD) ---------- */
const LIVING_COST_BASELINE = {
  "United States": { rent:1100, food:450, transport:110, utilities:130, clothes:70, misc:120 },
  "United Kingdom": { rent:950, food:380, transport:120, utilities:140, clothes:60, misc:110 },
  "Germany": { rent:600, food:280, transport:80, utilities:100, clothes:50, misc:90 },
  "Hong Kong": { rent:850, food:420, transport:90, utilities:110, clothes:60, misc:100 },
  "Singapore": { rent:800, food:400, transport:85, utilities:100, clothes:55, misc:100 },
  "Canada": { rent:900, food:380, transport:100, utilities:110, clothes:60, misc:100 },
  "Japan": { rent:650, food:350, transport:70, utilities:110, clothes:55, misc:90 },
  "Australia": { rent:950, food:400, transport:110, utilities:120, clothes:60, misc:110 },
  "Bangladesh": { rent:150, food:120, transport:35, utilities:40, clothes:20, misc:40 },
};

const CAREERS = [
  // ---- Technology ----
  { id: "ai-ml", label: "AI / ML Engineer", field: "computer-science", blurb: "Builds and ships machine-learning systems, from research prototypes to production models.", topUnis: ["mit","stanford","cmu","imperial"] },
  { id: "software-engineer", label: "Software Engineer", field: "computer-science", blurb: "Designs and builds the software that runs everything from apps to infrastructure.", topUnis: ["mit","cmu","ntu","nus"] },
  { id: "data-scientist", label: "Data Scientist", field: "computer-science", blurb: "Turns messy data into models and decisions organisations actually act on.", topUnis: ["cmu","mit","nus","utoronto"] },
  { id: "cybersecurity-analyst", label: "Cybersecurity Analyst", field: "computer-science", blurb: "Defends systems and networks against intrusion, and investigates breaches when they happen.", topUnis: ["cmu","imperial","ntu","uwaterloo"] },
  { id: "product-manager", label: "Product Manager", field: "computer-science", blurb: "Sets the roadmap for a product, translating user needs into what engineering builds next.", topUnis: ["stanford","cmu","nus","utoronto"] },
  { id: "game-developer", label: "Game Developer", field: "computer-science", blurb: "Builds the engines, systems, and worlds behind interactive games.", topUnis: ["cmu","uwaterloo","ntu","utoronto"] },
  { id: "robotics-engineer", label: "Robotics Engineer", field: "engineering", blurb: "Designs and programs machines that sense, decide, and act in the physical world.", topUnis: ["cmu","mit","eth","tum"] },

  // ---- Finance & business ----
  { id: "quant", label: "Quant Analyst", field: "physics", blurb: "Applies statistics and computation to price risk and find edges in financial markets.", topUnis: ["mit","imperial","cmu","anu"] },
  { id: "investment-banker", label: "Investment Banker", field: "business", blurb: "Advises on mergers, raises capital, and structures large financial deals.", topUnis: ["oxford","lse","hku","nus"] },
  { id: "actuary", label: "Actuary", field: "economics", blurb: "Prices risk for insurers and pension funds using statistics and probability.", topUnis: ["lse","utoronto","anu","hku"] },
  { id: "entrepreneur", label: "Entrepreneur / Founder", field: "business", blurb: "Builds a company from zero — product, funding, hiring, and everything in between.", topUnis: ["stanford","mit","nus","hku"] },
  { id: "digital-marketer", label: "Digital Marketer", field: "business", blurb: "Runs the campaigns, funnels, and brand strategy that get products in front of customers online.", topUnis: ["nus","lse","utoronto","unimelb"] },
  { id: "management-consultant", label: "Management Consultant", field: "business", blurb: "Diagnoses business problems for clients and designs the fix, project by project.", topUnis: ["oxford","lse","harvard","hku"] },
  { id: "accountant-cpa", label: "Accountant / CPA", field: "economics", blurb: "Keeps the books, audits the numbers, and keeps organisations compliant.", topUnis: ["lse","hku","nus","utoronto"] },
  { id: "real-estate-developer", label: "Real Estate Developer", field: "business", blurb: "Plans, finances, and delivers the buildings that shape a city.", topUnis: ["nus","hku","unimelb","utoronto"] },

  // ---- Medicine & health ----
  { id: "surgeon", label: "Surgeon", field: "medicine", blurb: "Diagnoses and operates to treat injury and disease — a long, exacting clinical path.", topUnis: ["harvard","cambridge","unimelb","utoronto"] },
  { id: "general-physician", label: "General Physician", field: "medicine", blurb: "Diagnoses and manages patient health across a broad range of conditions.", topUnis: ["harvard","oxford","unimelb","utoronto"] },
  { id: "dentist", label: "Dentist", field: "medicine", blurb: "Treats oral health, from routine care to reconstructive procedures.", topUnis: ["hku","unimelb","utoronto","kyoto"] },
  { id: "pharmacist", label: "Pharmacist", field: "medicine", blurb: "Manages medications and advises on safe, effective drug therapy.", topUnis: ["hku","cuhk","unimelb","utoronto"] },
  { id: "psychologist", label: "Psychologist", field: "arts", blurb: "Studies and treats mental health and behaviour, clinically or in research.", topUnis: ["harvard","oxford","unimelb","utoronto"] },
  { id: "public-health-specialist", label: "Public Health Specialist", field: "medicine", blurb: "Designs and runs population-level health interventions and policy.", topUnis: ["harvard","lse","unimelb","utokyo"] },
  { id: "biomedical-researcher", label: "Biomedical Researcher", field: "medicine", blurb: "Runs the lab science behind new treatments, drugs, and diagnostics.", topUnis: ["harvard","cambridge","kyoto","utoronto"] },

  // ---- Engineering ----
  { id: "civil-engineer", label: "Civil Engineer", field: "engineering", blurb: "Plans and builds the physical infrastructure that cities depend on.", topUnis: ["tum","imperial","ntu","kit"] },
  { id: "mechanical-engineer", label: "Mechanical Engineer", field: "engineering", blurb: "Designs the machines, engines, and mechanical systems that power industry.", topUnis: ["mit","tum","imperial","kit"] },
  { id: "electrical-engineer", label: "Electrical Engineer", field: "engineering", blurb: "Designs the circuits, power systems, and electronics behind modern devices.", topUnis: ["mit","imperial","tum","ntu"] },
  { id: "chemical-engineer", label: "Chemical Engineer", field: "engineering", blurb: "Scales chemistry into industrial processes — from fuel to pharmaceuticals.", topUnis: ["mit","imperial","tum","rwth"] },
  { id: "aerospace-engineer", label: "Aerospace Engineer", field: "engineering", blurb: "Designs aircraft, spacecraft, and the systems that get them off the ground.", topUnis: ["mit","imperial","tum","kit"] },
  { id: "architect", label: "Architect", field: "engineering", blurb: "Designs buildings and spaces that balance form, function, and structure.", topUnis: ["ucl","tum","hku","unimelb"] },
  { id: "urban-planner", label: "Urban Planner", field: "engineering", blurb: "Shapes how cities grow — land use, transport, and public space.", topUnis: ["ucl","lse","hku","unimelb"] },
  { id: "environmental-engineer", label: "Environmental Engineer", field: "engineering", blurb: "Designs systems that manage water, waste, and pollution at scale.", topUnis: ["tum","imperial","kit","unimelb"] },

  // ---- Law, policy & public service ----
  { id: "corporate-lawyer", label: "Corporate Lawyer", field: "law", blurb: "Structures contracts and counsels companies through deals, disputes, and compliance.", topUnis: ["oxford","hku","cambridge","utoronto"] },
  { id: "human-rights-lawyer", label: "Human Rights Lawyer", field: "law", blurb: "Litigates and advocates for civil liberties and international human-rights law.", topUnis: ["oxford","lse","cambridge","utoronto"] },
  { id: "politician", label: "Politician / Public Official", field: "arts", blurb: "Runs for and holds public office, shaping policy and representing constituents.", topUnis: ["oxford","harvard","lse","anu"] },
  { id: "diplomat", label: "Diplomat", field: "arts", blurb: "Represents a country abroad — negotiation, foreign policy, and international relations.", topUnis: ["oxford","lse","harvard","anu"] },
  { id: "journalist", label: "Journalist", field: "arts", blurb: "Investigates and reports the stories that hold power accountable.", topUnis: ["lse","cambridge","unimelb","utoronto"] },
  { id: "judge-magistrate", label: "Judge / Magistrate", field: "law", blurb: "Presides over legal proceedings and interprets the law in court.", topUnis: ["oxford","cambridge","hku","utoronto"] },

  // ---- Science, research & aviation ----
  { id: "economist", label: "Economist", field: "economics", blurb: "Studies how markets and policy shape resources, prices, and growth.", topUnis: ["oxford","lse","anu","utokyo"] },
  { id: "physicist", label: "Physicist", field: "physics", blurb: "Researches the fundamental rules that govern matter and energy.", topUnis: ["mit","cambridge","utokyo","kyoto"] },
  { id: "pilot", label: "Commercial Pilot", field: "engineering", blurb: "Flies passenger or cargo aircraft — a licensed, highly regulated technical career.", topUnis: ["unimelb","utoronto","anu","ntu"] },
  { id: "climate-scientist", label: "Climate Scientist", field: "physics", blurb: "Models and researches climate systems and environmental change.", topUnis: ["cambridge","utokyo","anu","unimelb"] },
  { id: "biotechnologist", label: "Biotechnologist", field: "medicine", blurb: "Applies biology at industrial scale — from agriculture to pharmaceuticals.", topUnis: ["cambridge","kyoto","nus","utoronto"] },

  // ---- Arts, design & education ----
  { id: "ux-designer", label: "UX / Product Designer", field: "arts", blurb: "Designs how digital products look, feel, and work for the people using them.", topUnis: ["cmu","nus","unimelb","ntu"] },
  { id: "architect-interior", label: "Interior Architect", field: "arts", blurb: "Designs functional, beautiful interior spaces for homes and institutions.", topUnis: ["ucl","hku","unimelb","nus"] },
  { id: "teacher-educator", label: "Teacher / Educator", field: "arts", blurb: "Teaches and shapes curriculum — school, university, or ed-tech.", topUnis: ["ucl","harvard","unimelb","utoronto"] },
  { id: "film-director", label: "Film Director", field: "arts", blurb: "Directs the creative and technical vision behind film and video projects.", topUnis: ["ucl","unimelb","ntu","utoronto"] },
];

const SUBJECT_REQUIREMENTS = {
  "ai-ml": { hsc:["Physics","Chemistry","Higher Mathematics"], madrasha:["Physics","Higher Mathematics","Chemistry"], alevels:["Mathematics","Further Mathematics","Physics"] },
  "quant": { hsc:["Higher Mathematics","Physics","Chemistry"], madrasha:["Higher Mathematics","Physics"], alevels:["Mathematics","Further Mathematics","Economics"] },
  "investment-banker": { hsc:["Accounting","Business Studies","Higher Mathematics"], madrasha:["Accounting","Business Studies"], alevels:["Mathematics","Economics","Business"] },
  "surgeon": { hsc:["Biology","Chemistry","Physics"], madrasha:["Biology","Chemistry","Physics"], alevels:["Biology","Chemistry","Mathematics"] },
  "software-engineer": { hsc:["Higher Mathematics","Physics","ICT"], madrasha:["Higher Mathematics","Physics"], alevels:["Mathematics","Computer Science","Physics"] },
  "civil-engineer": { hsc:["Higher Mathematics","Physics","Chemistry"], madrasha:["Higher Mathematics","Physics"], alevels:["Mathematics","Physics","Chemistry"] },
  "economist": { hsc:["Higher Mathematics","Economics","Business Studies"], madrasha:["Higher Mathematics","Economics"], alevels:["Mathematics","Economics","Further Mathematics"] },
  "corporate-lawyer": { hsc:["Business Studies","Accounting","Economics"], madrasha:["Business Studies","Economics"], alevels:["Economics","Business","History"] },
};

/* Fallback subject template by broad field — used by the Subject Planner
   whenever a career doesn't have a bespoke entry in SUBJECT_REQUIREMENTS. */
const FIELD_SUBJECT_TEMPLATE = {
  "computer-science": { hsc:["Higher Mathematics","Physics","ICT"], madrasha:["Higher Mathematics","Physics"], alevels:["Mathematics","Computer Science","Physics"] },
  "engineering": { hsc:["Higher Mathematics","Physics","Chemistry"], madrasha:["Higher Mathematics","Physics"], alevels:["Mathematics","Physics","Chemistry"] },
  "physics": { hsc:["Higher Mathematics","Physics","Chemistry"], madrasha:["Higher Mathematics","Physics"], alevels:["Mathematics","Further Mathematics","Physics"] },
  "business": { hsc:["Accounting","Business Studies","Higher Mathematics"], madrasha:["Accounting","Business Studies"], alevels:["Business Studies","Economics","Mathematics"] },
  "economics": { hsc:["Higher Mathematics","Economics","Business Studies"], madrasha:["Higher Mathematics","Economics"], alevels:["Economics","Mathematics","Further Mathematics"] },
  "medicine": { hsc:["Biology","Chemistry","Physics"], madrasha:["Biology","Chemistry","Physics"], alevels:["Biology","Chemistry","Mathematics"] },
  "law": { hsc:["Business Studies","Accounting","Economics"], madrasha:["Fiqh & Usul","Arabic"], alevels:["Law","Economics","History"] },
  "arts": { hsc:["History","Civics","Economics"], madrasha:["Arabic","Islamic History"], alevels:["Sociology","Psychology","English Literature"] },
};

const ELIGIBILITY_PROGRAMS = [
  // ---- Science stream ----
  { program: "BSc Computer Science", needs: ["Physics", "Higher Mathematics"], stream: "science" },
  { program: "BEng Electrical & Electronic Engineering", needs: ["Physics", "Higher Mathematics", "Chemistry"], stream: "science" },
  { program: "BEng Civil Engineering", needs: ["Physics", "Higher Mathematics"], stream: "science" },
  { program: "BEng Mechanical Engineering", needs: ["Physics", "Higher Mathematics"], stream: "science" },
  { program: "MBBS Medicine", needs: ["Biology", "Chemistry", "Physics"], stream: "science" },
  { program: "BDS Dentistry", needs: ["Biology", "Chemistry"], stream: "science" },
  { program: "BSc Pharmacy", needs: ["Biology", "Chemistry"], stream: "science" },
  { program: "BSc Physics", needs: ["Physics", "Higher Mathematics"], stream: "science" },
  { program: "BSc Mathematics", needs: ["Higher Mathematics"], stream: "science" },
  { program: "BSc Actuarial Science", needs: ["Higher Mathematics"], stream: "science" },
  { program: "BSc Data Science", needs: ["Higher Mathematics", "Computer Science"], stream: "science" },
  { program: "BSc Biotechnology", needs: ["Biology", "Chemistry"], stream: "science" },
  { program: "BArch Architecture", needs: ["Physics", "Higher Mathematics"], stream: "science" },
  { program: "BSc Environmental Science", needs: ["Biology", "Chemistry"], stream: "science" },
  { program: "BSc Aerospace Engineering", needs: ["Physics", "Higher Mathematics"], stream: "science" },

  // ---- Commerce stream ----
  { program: "BBA Finance", needs: ["Accounting", "Higher Mathematics"], stream: "commerce" },
  { program: "BSc Economics", needs: ["Accounting", "Business Studies"], stream: "commerce" },
  { program: "BBA Marketing", needs: ["Business Studies"], stream: "commerce" },
  { program: "LLB Law", needs: ["Business Studies", "Accounting"], stream: "commerce" },
  { program: "BBA Accounting & Auditing", needs: ["Accounting"], stream: "commerce" },
  { program: "BSc Actuarial Science (Commerce track)", needs: ["Higher Mathematics", "Accounting"], stream: "commerce" },
  { program: "BSc Statistics", needs: ["Higher Mathematics"], stream: "commerce" },
  { program: "BBA Supply Chain Management", needs: ["Business Studies", "Economics"], stream: "commerce" },
  { program: "BSc Computer Studies (Commerce track)", needs: ["Higher Mathematics"], stream: "commerce" },
  { program: "BA Politics, Philosophy & Economics", needs: ["Economics"], stream: "commerce" },

  // ---- Arts stream ----
  { program: "BA International Relations", needs: [], stream: "arts" },
  { program: "BA Psychology", needs: [], stream: "arts" },
  { program: "BFA Design", needs: [], stream: "arts" },
  { program: "BA Sociology", needs: [], stream: "arts" },
  { program: "BA Law (LLB, Arts track)", needs: [], stream: "arts" },
  { program: "BA History", needs: ["History"], stream: "arts" },
  { program: "BA Journalism & Media Studies", needs: [], stream: "arts" },
  { program: "BA Fine Arts", needs: [], stream: "arts" },
  { program: "BEd Education", needs: [], stream: "arts" },
  { program: "BA Political Science", needs: [], stream: "arts" },

  // ---- Madrasa: Science ----
  { program: "MBBS Medicine (Madrasa Science)", needs: ["Biology", "Chemistry", "Physics"], stream: "madrasha-science" },
  { program: "BSc Computer Science (Madrasa Science)", needs: ["Physics", "Higher Mathematics"], stream: "madrasha-science" },
  { program: "BEng Engineering (Madrasa Science)", needs: ["Physics", "Higher Mathematics", "Chemistry"], stream: "madrasha-science" },
  { program: "BSc Pharmacy (Madrasa Science)", needs: ["Biology", "Chemistry"], stream: "madrasha-science" },

  // ---- Madrasa: Humanities → degree mapping (per spec) ----
  { program: "BA in Semitic Languages", needs: ["Arabic","Fiqh & Usul","Tafsir","Hadith"], stream: "madrasha-humanities", countries: "UK, USA, Germany, Israel, Netherlands" },
  { program: "BA in Islamic Studies", needs: ["Arabic","Islamic History","Hadith"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, Bangladesh, Egypt, UK" },
  { program: "BA in Arabic Language & Literature", needs: ["Arabic","Tafsir"], stream: "madrasha-humanities", countries: "Egypt, Saudi Arabia, UAE, UK, USA" },
  { program: "BA in Arabic Linguistics", needs: ["Arabic","Fiqh & Usul"], stream: "madrasha-humanities", countries: "UK, USA, Egypt, Germany, Canada" },
  { program: "BA in Comparative Semitic Studies", needs: ["Hadith","Tafsir","Arabic"], stream: "madrasha-humanities", countries: "UK, USA, Germany, Israel" },
  { program: "BA in Islamic Art & Architecture", needs: ["Islamic History"], stream: "madrasha-humanities", countries: "Saudi Arabia, UAE, UK, Egypt" },
  { program: "BA in Middle Eastern Studies", needs: ["Arabic","Islamic History"], stream: "madrasha-humanities", countries: "UK, USA, UAE, Jordan, Egypt" },
  { program: "BA in Modern Middle Eastern History", needs: ["Islamic History"], stream: "madrasha-humanities", countries: "UK, USA, Egypt, Turkey, UAE" },
  { program: "BA in Near Eastern Archaeology", needs: ["Islamic History"], stream: "madrasha-humanities", countries: "Egypt, Jordan, UK, USA, Turkey" },
  { program: "BA in Quranic Studies", needs: ["Tafsir","Hadith"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, Bangladesh, Egypt, Pakistan" },
  { program: "BA in Religious Studies", needs: ["Fiqh & Usul","Hadith"], stream: "madrasha-humanities", countries: "USA, UK, Saudi Arabia, India, Canada" },
  { program: "BA in Shariah & Islamic Law", needs: ["Fiqh & Usul"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, UAE, Bangladesh, Qatar" },
  { program: "BA in Teaching Arabic as a Foreign Language", needs: ["Arabic"], stream: "madrasha-humanities", countries: "Saudi Arabia, UAE, UK, USA, Malaysia" },
  { program: "BA in Translation & Interpreting", needs: ["Arabic"], stream: "madrasha-humanities", countries: "UAE, Qatar, UK, Egypt, Saudi Arabia" },
  { program: "BEd in Arabic Language Teaching", needs: ["Arabic"], stream: "madrasha-humanities", countries: "Saudi Arabia, UAE, Malaysia, Bangladesh, Qatar" },
  { program: "LLB in Shariah Law", needs: ["Fiqh & Usul"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, UAE, Bangladesh, Pakistan" },
  { program: "BA in Arabic Studies", needs: ["Arabic"], stream: "madrasha-humanities", countries: "Saudi Arabia, Egypt, UK, Malaysia, UAE" },
  { program: "BA in Comparative Religion", needs: ["Hadith","Tafsir"], stream: "madrasha-humanities", countries: "UK, USA, Saudi Arabia, India, Malaysia" },
  { program: "BA in Islamic Exegesis / Tafsir", needs: ["Tafsir"], stream: "madrasha-humanities", countries: "Saudi Arabia, Egypt, Malaysia, UAE, Qatar" },
  { program: "BA in Quran & Hadith Studies", needs: ["Tafsir","Hadith"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, UAE, Bangladesh, Pakistan" },
  { program: "BA in Quranic Sciences", needs: ["Tafsir"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, Egypt, UAE, Indonesia" },
  { program: "BA in Theology", needs: ["Fiqh & Usul","Hadith"], stream: "madrasha-humanities", countries: "UK, USA, Germany, Saudi Arabia, Italy" },
  { program: "BA in Hadith Studies", needs: ["Hadith"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, UAE, Bangladesh, Qatar" },
  { program: "BA in Quran & Hadith Sciences", needs: ["Hadith","Tafsir"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, UAE, Egypt, Pakistan" },
  { program: "BA in Sunnah Studies", needs: ["Hadith"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, UAE, Bangladesh, Jordan" },
  { program: "BA in Usul al-Din", needs: ["Fiqh & Usul"], stream: "madrasha-humanities", countries: "Saudi Arabia, Malaysia, Egypt, UAE, Qatar" },
];

/* ---------- Curriculum-aware subject lists ---------- */
const CURRICULUM_SUBJECTS = {
  hsc: {
    science: ["Physics", "Chemistry", "Biology", "Higher Mathematics", "Computer Science"],
    commerce: ["Accounting", "Business Studies", "Economics", "Higher Mathematics", "Statistics"],
    arts: ["History", "Civics", "Sociology", "English Literature", "Psychology", "Economics", "Law"],
  },
  alevels: {
    all: ["Physics","Chemistry","Biology","Accounting","Business Studies","Economics","History","Geography",
          "English Literature","Psychology","Sociology","Computer Science","Statistics","Information Technology",
          "Design and Technology","Art & Design","Freehand Drawing","French","German","Environmental Management",
          "Mathematics","Further Mathematics","Law"],
  },
  madrasha: {
    science: ["Physics", "Chemistry", "Biology", "Higher Mathematics"],
    humanities: ["Arabic", "Islamic History", "Fiqh & Usul", "Tafsir", "Hadith"],
  },
};

// Legacy alias kept for any older references.
const SUBJECTS_BY_STREAM = CURRICULUM_SUBJECTS.hsc;

const VISA_INFO = [
  { country: "USA", visa: "F-1 Student Visa", processing: "3–5 weeks", funds: "$25,000+ proof", steps: ["Receive I-20 from university","Pay SEVIS fee","Complete DS-160","Book & attend embassy interview"] },
  { country: "UK", visa: "Student Route (Tier 4)", processing: "3 weeks", funds: "£12,000+ proof (28-day rule)", steps: ["Get CAS from university","Prove funds for 28 consecutive days","Complete online application","Attend biometrics appointment"] },
  { country: "Canada", visa: "Study Permit", processing: "4–8 weeks", funds: "CA$20,635+ (GIC)", steps: ["Get Letter of Acceptance","Apply online with biometrics","Show proof of funds (GIC)","Medical exam if required"] },
  { country: "Germany", visa: "National Student Visa", processing: "6–12 weeks", funds: "€11,904 blocked account", steps: ["Open blocked account","Book VFS appointment","Submit health insurance proof","Attend visa interview"] },
  { country: "Australia", visa: "Subclass 500", processing: "4–6 weeks", funds: "AU$29,710+ proof", steps: ["Get CoE from university","Write GTE statement","Health & OSHC cover","Lodge online application"] },
  { country: "Singapore", visa: "Student's Pass", processing: "2–4 weeks", funds: "Varies by course", steps: ["Register on SOLAR via institution","Submit eForm 16","Medical examination","Complete formalities on arrival"] },
  { country: "Hong Kong", visa: "Student Visa/Entry Permit", processing: "6–8 weeks", funds: "HK$180,000+ recommended", steps: ["Get unconditional offer","Apply via ImmD online","Provide proof of accommodation","Collect visa label on arrival"] },
  { country: "Japan", visa: "Student Visa (Ryugaku)", processing: "1–3 months", funds: "¥2,000,000+ recommended", steps: ["University applies for Certificate of Eligibility (CoE)","Submit CoE + application to embassy","Provide financial sponsor documents","Attend visa interview if required"] },
];

const RANKING_SETS = { qs:"qs", the:"the", usnews:"usnews", arwu:"arwu" };

const ECA_LIBRARY = {
  broad: [
    "Join or lead a subject-relevant school club (debate, robotics, coding, Model UN)",
    "Volunteer 40+ hours with a local NGO or community project",
    "Take a free online course (Coursera/edX) related to your intended major",
    "Participate in an inter-school or national-level competition",
    "Shadow a professional in your target field for a week",
  ],
  competitive: {
    "computer-science": ["Place at a national Olympiad in Informatics","Build and ship an app with real users","Contribute to an open-source project on GitHub","Win a hackathon or organise one for your school"],
    "engineering": ["Enter a robotics or design competition (FIRST, VEX)","Complete a research project with a university mentor","Prototype a working invention or patent-pending design","Intern at an engineering firm"],
    "medicine": ["Volunteer in a hospital or clinic setting","Complete a certified First Aid / EMT course","Run a public-health awareness project","Shadow a physician and log reflective case notes"],
    "business": ["Launch a small venture or social enterprise","Win a case-competition or business plan contest","Complete a finance/investing certification (CFA Level 1 prep)","Intern at a startup or bank"],
    "law": ["Compete in Model UN or a mock trial competition","Intern at a law firm or NGO legal-aid desk","Publish an op-ed on a policy issue","Captain the school debate team"],
    "arts": ["Curate or exhibit an independent creative portfolio","Win a regional or national arts competition","Publish written work in a literary magazine","Lead a creative project with measurable community impact"],
    "physics": ["Place at a Physics/Math Olympiad (national or international tier)","Run an independent research project with a university mentor","Present at a regional or national science fair (e.g. ISEF-affiliated)","Publish results in a student research journal"],
    "economics": ["Win a national economics or case-competition challenge","Complete a certification in data analysis or econometrics","Write and publish original policy or market analysis","Intern at a think tank, NGO, or financial institution"],
  },
};

/* ---------- ECA Advisor: per-university profiles ----------
   Bespoke profiles for a representative set of anchor schools (inspired by
   the kind of real-world guidance found on sites like lumosfellows.com —
   summarised and rewritten in our own words, not reproduced). Every other
   university in the database falls back to a tier template (reach / match
   / safety) computed from its QS rank, so the tool never comes up empty. */
const ECA_PROFILES = {
  harvard: {
    type: "Ivy League",
    broad: [
      "Demonstrated leadership in established school or community organizations",
      "Consistent, long-term commitment to community service or social impact initiatives",
      "High-level achievement or dedication in arts, athletics, or extracurricular pursuits",
      "Evidence of intellectual vitality through independent research or academic projects",
    ],
    specific: [
      "Conduct and publish original research in a peer-reviewed journal, or present at a regional/national science fair (e.g. ISEF)",
      "Found a non-profit or community initiative with measurable, scalable impact on a specific demographic",
      "Achieve national or international recognition in competitive academic Olympiads (e.g. Math, Biology, Physics tier)",
      "Engage in high-level civic engagement or advocacy work that influences local or state-level policy",
      "Complete an advanced independent project — a book, a patent-pending build, or a significant musical composition",
    ],
    notes: "Harvard practices holistic admissions, seeking 'distance traveled' — the impact you've made relative to your opportunities. It prioritizes 'spiky' candidates with exceptional depth in one or two areas over generically well-rounded applicants. Focus on quality, leadership, and tangible outcomes rather than a long list of memberships.",
  },
  brac: {
    type: "Private Research University",
    broad: [
      "Leadership roles in school clubs or student government",
      "Participation in national-level academic competitions (Olympiads)",
      "Community service and volunteer work",
      "Sports or cultural extracurriculars demonstrating teamwork",
    ],
    specific: [
      "Participation in the Bangladesh Math Olympiad or Informatics Olympiad",
      "Completion of relevant online certifications (Coursera/edX) in Data Science, Coding, or Business",
      "Engagement in local social-impact projects or internships with NGOs",
      "Active involvement in debate clubs or Model United Nations (MUN) conferences",
      "Independent research projects or science-fair entries related to sustainable development",
    ],
    notes: "BRAC University places primary emphasis on academic performance (HSC/A-Level grades and admission test scores). ECAs aren't the primary deciding factor, but they're highly beneficial for scholarship consideration and demonstrating a well-rounded profile — favour activities that show leadership, social responsibility, and technical skill.",
  },
  oxford: {
    type: "Tutorial-system, Reach tier",
    broad: [
      "Deep, demonstrable passion for your specific subject beyond the school syllabus",
      "Sustained academic reading or independent study in your intended field",
      "Leadership in academically-oriented clubs or societies",
      "Consistent extracurricular commitment over multiple years, not a last-minute list",
    ],
    specific: [
      "Submit an entry to a subject-specific essay competition (e.g. John Locke Institute)",
      "Complete a EPQ-style independent research project with a written dissertation",
      "Attend or apply to a subject-focused summer school or academic enrichment program",
      "Achieve strong performance in subject Olympiads relevant to your course (Maths, Chemistry, Philosophy, etc.)",
    ],
    notes: "Oxford's tutorial system means admissions tutors look for evidence you can sustain an independent, subject-specific line of thinking — not broad extracurricular breadth. Super-curricular activities (reading, research, competitions tied directly to your course) matter more here than generic leadership roles.",
  },
  mit: {
    type: "STEM Reach tier",
    broad: [
      "Hands-on building or making — robotics, hardware, or software projects with visible output",
      "Sustained involvement in a maker space, robotics team, or coding community",
      "Initiative-driven projects rather than passive club membership",
      "Collaborative technical work with measurable results",
    ],
    specific: [
      "Place at an international-tier STEM Olympiad (Math, Physics, Informatics, or Chemistry)",
      "Ship a technical project with real users — an app, an open-source library, or a working hardware build",
      "Conduct mentored research and co-author a paper or poster",
      "Found or lead a technical club, hackathon, or maker initiative at your school",
    ],
    notes: "MIT admissions explicitly looks for 'matchfit' — evidence you build things and solve real problems, not just that you're academically strong. Initiative and hands-on technical output outweigh titles or memberships.",
  },
  buet: {
    type: "Test-driven Public Engineering School",
    broad: [
      "Strong, consistent HSC academic performance in Physics, Chemistry, and Higher Mathematics",
      "Participation in school-level science or math clubs",
      "Basic exposure to problem-solving competitions",
    ],
    specific: [
      "Compete in the Bangladesh Physics/Math/Informatics Olympiad",
      "Practice extensively with past BUET admission test papers",
      "Join a structured HSC-syllabus coaching or self-study program for Physics/Chemistry/Math",
    ],
    notes: "BUET admission is almost entirely test-driven — a two-stage screening plus a written exam scored on HSC-syllabus mastery. ECAs have little to no weight here; time is far better spent on test preparation than activity-building.",
  },
};

/* Tier fallback used for any university without a bespoke ECA_PROFILES entry. */
function getUniTier(qsRank){
  if (!qsRank) return "match";
  if (qsRank <= 30) return "reach";
  if (qsRank <= 150) return "match";
  return "safety";
}
const ECA_TIER_TEMPLATES = {
  reach: {
    type: "Reach tier (Top-30 global)",
    broad: [
      "Leadership in established school or community organizations",
      "Long-term, consistent commitment to service or social impact",
      "High-level achievement in arts, athletics, or academic pursuits",
      "Independent research or self-directed academic projects",
    ],
    notesSuffix: "Reach-tier admissions are holistic and highly selective — depth and demonstrated impact in one or two areas matter far more than a long list of memberships.",
  },
  match: {
    type: "Match tier (Top-150 global)",
    broad: [
      "Leadership roles in school clubs or student government",
      "National-level academic competition participation (Olympiads)",
      "Sustained community service or volunteer work",
      "Relevant certifications or self-directed coursework",
    ],
    notesSuffix: "Match-tier schools weigh ECAs as a meaningful but secondary factor — strong grades and test scores come first, with activities strengthening the overall application and scholarship chances.",
  },
  safety: {
    type: "Safety / regional-strong tier",
    broad: [
      "Consistent school-level involvement in clubs or committees",
      "Basic community service or volunteering",
      "Relevant short courses or certifications",
    ],
    notesSuffix: "At this tier, admission is driven mainly by grades and test scores — ECAs are a bonus for scholarships rather than a gatekeeping factor.",
  },
};

const FIELD_LABELS = {
  "computer-science": "Computer Science",
  "engineering": "Engineering",
  "ai-ml": "AI / Machine Learning",
  "physics": "Physics",
  "law": "Law",
  "medicine": "Medicine",
  "economics": "Economics",
  "business": "Business",
  "arts": "Arts & Humanities",
};

const COUNTRY_LIST = ["United States","United Kingdom","Germany","Hong Kong","Singapore","Canada","Japan","Australia","Bangladesh"];

/* ============================================================
   Grade normalization, admissions strategy, financial planning,
   and visa-prep datasets. All figures sourced/verified July 2026
   unless noted; immigration and wage rules change — always point
   students to the official source for anything final.
============================================================ */

/* ---------- GPA Normalizer ---------- */
// Each converter takes a raw score/grade and returns an estimated 4.0-scale GPA.
const GPA_CONVERTERS = {
  hsc5: { label:"HSC / National Curriculum (GPA out of 5.0)", toFour: (v) => Math.min(4, (v/5)*4) },
  alevel: { label:"A-Level (best 3 grades, letter)", points: { "A*":4.0,"A":3.7,"B":3.3,"C":3.0,"D":2.3,"E":1.7 } },
  olevel: { label:"O-Level / IGCSE (best 5 grades, letter)", points: { "A*":4.0,"A":3.7,"B":3.3,"C":3.0,"D":2.3,"E":1.7 } },
  ib: { label:"IB Diploma (points out of 45)", toFour: (v) => Math.max(0, Math.min(4, ((v-24)/(45-24))*4)) },
  percentage: { label:"Percentage (out of 100)", toFour: (v) => Math.max(0, Math.min(4, (v-50)/12.5)) },
};

/* ---------- Admissions weighting by region (illustrative composite, not any single university's real rubric) ---------- */
const ADMISSIONS_WEIGHTING = {
  "United States": { academics:40, ecs:30, essays:20, lors:10, note:"US holistic review genuinely weighs essays and activities — a strong story with a slightly lower GPA can outcompete a perfect GPA with a generic profile." },
  "United Kingdom": { academics:80, ecs:5, essays:15, lors:0, note:"UK admissions (via UCAS) are overwhelmingly grade- and subject-fit driven; the personal statement matters far more for subject-specific reasoning than for 'extracurricular balance'. LORs are structural, not persuasive." },
  "Canada": { academics:65, ecs:15, essays:15, lors:5, note:"Canadian admissions sit between the UK and US models — grades dominate, but supplementary essays and activities matter more at competitive programs (e.g., Waterloo CS, UofT Rotman Commerce)." },
  "Australia": { academics:75, ecs:10, essays:10, lors:5, note:"Australian admissions are largely ATAR/grade-equivalent driven, with holistic review mainly reserved for a handful of flagship programs and scholarships." },
  "Germany": { academics:90, ecs:2, essays:5, lors:3, note:"German public universities admit almost purely on academic record (Abitur-equivalent grades / NC cutoffs) — ECs and essays carry minimal weight outside a few English-taught programs." },
};

/* ---------- ED / EA / RD strategic round selector ---------- */
const APPLICATION_ROUNDS = {
  ED: { label:"Early Decision", boost:"10–15%", note:"Binding — if admitted, you must withdraw all other applications and attend. Only commit if this is genuinely your top choice and the financial aid offer works for your family.", risk:"high" },
  EA: { label:"Early Action", boost:"3–7%", note:"Non-binding — you get an early answer with no obligation to attend, so it's lower-risk than ED but the acceptance-rate boost is smaller too.", risk:"low" },
  RD: { label:"Regular Decision", boost:"baseline", note:"No admissions boost, but no binding commitment and the most time to strengthen your application and compare financial aid offers.", risk:"none" },
};

/* ---------- Post-graduation work visa runway (verified July 2026) ---------- */
const WORK_VISA_RUNWAY = {
  "United States": {
    stemMonths: 36, nonStemMonths: 12,
    detail: "F-1 OPT gives 12 months of work authorization after graduation for any major. If your degree is on the DHS STEM Designated Degree Program List, you can apply for a 24-month STEM OPT extension — 36 months total. After that, most students need the H-1B lottery (roughly 18–25% selection odds per attempt; STEM OPT gives you up to 3 lottery attempts instead of 1).",
    source: "USCIS — Optional Practical Training Extension for STEM Students",
  },
  "United Kingdom": {
    bachelorMasterMonths: 24, phdMonths: 36,
    detail: "The Graduate Route gives 2 years to bachelor's/master's graduates and 3 years to PhD graduates — but this is changing: for applications submitted on or after 1 January 2027, the bachelor's/master's duration drops to 18 months (PhD stays at 3 years). What matters is your application submission date, not your graduation date.",
    source: "UK Home Office — Graduate Route (Statement of Changes, 14 Oct 2025)",
  },
  "Canada": {
    months: 36,
    detail: "The Post-Graduation Work Permit (PGWP) length depends on your program length, up to a maximum of 3 years for programs 2 years or longer. It's an open work permit — any employer, any field — and counts directly toward Express Entry permanent residency.",
    source: "IRCC — Post-graduation work permit",
  },
  "Germany": {
    months: 18,
    detail: "Graduates get an 18-month job-seeker visa to find skilled work matching their degree. Once employed, the EU Blue Card (salary threshold ~€45,300/yr, or ~€41,042 for shortage occupations like IT/engineering) can lead to permanent settlement in as little as 21 months with B1 German.",
    source: "German Federal Foreign Office — Job Seeker Visa",
  },
  "Australia": {
    months: 30,
    detail: "The Temporary Graduate visa (Subclass 485) runs roughly 2–4 years depending on qualification level and age — bachelor's/master's graduates typically get around 2–3 years, Master's-by-Research/PhD up to 4 years. Most streams now cap eligibility at age 35. Rules have tightened recently, so confirm current settings before counting on a specific figure.",
    source: "Australian Department of Home Affairs — Subclass 485",
  },
  "Singapore": {
    months: 12,
    detail: "Singapore has no automatic multi-year post-study visa. Graduates from recognised institutions (NUS, NTU, SMU, etc.) can get a 1-year, non-renewable Long-Term Visit Pass to job-hunt — but you can only start working once an employer sponsors an Employment Pass or S Pass, which requires a job offer first.",
    source: "Singapore ICA — Long-Term Visit Pass for graduates",
  },
  "Hong Kong": {
    months: 24,
    detail: "The IANG (Immigration Arrangements for Non-local Graduates) visa gives 2 years to stay with no job offer required and no restrictions on the type of work — one of the more flexible options in Asia.",
    source: "Hong Kong Immigration Department — IANG",
  },
  "Japan": {
    months: 9,
    detail: "Graduates can get a 6–12 month job-seeking visa, but must actively demonstrate job-search activity to maintain it — it's not a free stay-back period.",
    source: "Japan Immigration Services Agency",
  },
};

/* ---------- Part-time work & tax matrix (verified July 2026 — always check the official source before relying on this) ---------- */
const PART_TIME_WORK_RULES = {
  "United States": { hoursPerWeekTerm:20, hoursBreak:"unrestricted (on-campus only, in practice)", minWage:"$12–15/hr typical campus rate (federal floor $7.25)", taxFreeNote:"Standard federal filing threshold applies; most on-campus student income falls under it, but F-1 students must still file a tax return (often $0 owed).", note:"On-campus only during the first academic year; off-campus work generally requires CPT/OPT authorization tied to your program." },
  "United Kingdom": { hoursPerWeekTerm:20, hoursBreak:"unlimited during official breaks", minWage:"£12.21/hr (National Living Wage, age 21+)", taxFreeNote:"£12,570/year personal allowance — most part-time student income is untaxed.", note:"20-hour cap applies to most degree-level Student visa holders; check your visa conditions for any lower limit." },
  "Canada": { hoursPerWeekTerm:24, hoursBreak:"unlimited during scheduled breaks", minWage:"CA$17–18/hr (varies by province)", taxFreeNote:"Basic personal amount ~CA$15,000/year is untaxed federally.", note:"24 hrs/week became the permanent off-campus limit from late 2024, up from the old 20-hour cap." },
  "Australia": { hoursPerWeekTerm:24, hoursBreak:"unlimited during scheduled breaks", minWage:"AU$24.10–24.95/hr", taxFreeNote:"Tax-free threshold is AU$18,200/year for residents for tax purposes.", note:"Limit is expressed as 48 hours per fortnight, not a strict weekly cap — you can work more one week if you work less the next." },
  "Germany": { hoursPerWeekTerm:"~20 (140 full days/year)", hoursBreak:"full-time during semester breaks, within the annual day cap", minWage:"€13.90/hr", taxFreeNote:"€12,348/year tax-free (Grundfreibetrag); Werkstudent roles are also exempt from unemployment/nursing-care insurance contributions.", note:"Germany caps by days worked per year (140 full days or 280 half-days), not a strict weekly hour limit." },
  "Singapore": { hoursPerWeekTerm:16, hoursBreak:"case-by-case, check MOM", minWage:"No statutory minimum wage", taxFreeNote:"Income below SGD 22,000/year is generally untaxed for residents.", note:"Off-campus work rights are limited and employer-dependent — verify with your institution and MOM before accepting any role." },
  "Hong Kong": { hoursPerWeekTerm:"Not generally permitted off-campus", hoursBreak:"limited internship schemes only", minWage:"HK$42.10/hr", taxFreeNote:"n/a for most students", note:"Student visa holders generally cannot work off-campus except through approved internship schemes — check with your university." },
  "Japan": { hoursPerWeekTerm:28, hoursBreak:"up to 40 hrs/week during long vacations", minWage:"¥1,000–1,100/hr (varies by prefecture)", taxFreeNote:"Income below ¥1.03 million/year is generally untaxed.", note:"Requires a separate 'permission to engage in activity other than that permitted' stamp from immigration before working at all." },
};

/* ---------- Currency conversion (illustrative static rates — always check a live rate before relying on this) ---------- */
const CURRENCY_RATES_PER_USD = { USD:1, GBP:0.79, EUR:0.92, CAD:1.36, AUD:1.51, SGD:1.30, HKD:7.82, JPY:151, BDT:122 };
const CURRENCY_SYMBOLS = { USD:"$", GBP:"£", EUR:"€", CAD:"CA$", AUD:"AU$", SGD:"S$", HKD:"HK$", JPY:"¥", BDT:"৳" };

/* ---------- Hidden ancillary costs (typical annual baseline, USD) ---------- */
const ANCILLARY_COSTS = {
  healthInsurance: 2500,
  sevisOrRegistrationFee: 350,
  textbooksAndSupplies: 1200,
  emergencyFlightBuffer: 900,
};

/* ---------- Scholarship tier screener (illustrative thresholds — real cutoffs vary by university and year) ---------- */
const SCHOLARSHIP_TIERS = [
  { minGpa4:3.85, minTestPercentile:95, tier:"Presidential / Full-Ride Tier", typicalDiscount:"Full tuition + stipend" },
  { minGpa4:3.6, minTestPercentile:85, tier:"Dean's / Merit Tier 1", typicalDiscount:"50–100% tuition waiver" },
  { minGpa4:3.3, minTestPercentile:70, tier:"Merit Tier 2", typicalDiscount:"20–50% tuition waiver" },
  { minGpa4:0, minTestPercentile:0, tier:"Standard / Need-Based Only", typicalDiscount:"Apply for need-based aid directly" },
];

/* ---------- Mock visa interview flashcards (US F-1 focus — the highest-stakes, most-studied case) ---------- */
const VISA_INTERVIEW_QUESTIONS = [
  { q:"Why did you choose this specific university?", good:"Name 2–3 concrete, researched reasons tied to your major (a specific lab, program strength, faculty) — shows genuine intent, not a generic answer.", flag:"\"It was the cheapest one that accepted me\" or visible hesitation naming anything specific about the school." },
  { q:"Who is funding your education?", good:"State your sponsor clearly and confidently (parent, scholarship, loan) with a one-line summary of the funding source's stability.", flag:"Vague answers, or funding sources that don't match your submitted bank documents — this is one of the most scrutinized questions." },
  { q:"What are your plans after graduation?", good:"Express intent to build your career, mentioning it may include gaining work experience via OPT/PGWP before deciding next steps — plans that stay open without contradicting your visa's temporary nature.", flag:"Explicitly stating you plan to stay and immigrate permanently right after this question — even if true, this reads as immigrant intent on a non-immigrant visa." },
  { q:"Why not study this subject in your home country?", good:"Point to specific program strengths, research opportunities, or industry access unavailable at home — practical, not dismissive of your home country's institutions.", flag:"Criticizing your home country's education system broadly, which can read as evasive rather than substantive." },
  { q:"Do you have relatives in this country?", good:"Answer honestly and briefly — having relatives isn't disqualifying by itself.", flag:"Inconsistency with your submitted forms, or over-elaborating in a way that suggests you're trying to establish a settlement narrative." },
  { q:"What will you do if your visa is denied?", good:"A calm, brief answer that you'd reapply or reconsider your plans — shows composure.", flag:"Panic, or an answer suggesting you'd try to enter through another route regardless." },
];


/* ---------- Shared plain-English query parsing ----------
   Used by both the Tools page search box and the chat assistant, so the
   two never disagree about what a sentence means. */
const REGION_MAP = {
  europe: ["United Kingdom","Germany"],
  uk: ["United Kingdom"], britain: ["United Kingdom"], england: ["United Kingdom"],
  us: ["United States"], usa: ["United States"], america: ["United States"],
  germany: ["Germany"],
  canada: ["Canada"],
  singapore: ["Singapore"],
  "hong kong": ["Hong Kong"], hk: ["Hong Kong"],
  japan: ["Japan"],
  australia: ["Australia"],
  bangladesh: ["Bangladesh"],
  asia: ["Singapore","Hong Kong","Japan"],
};
const FIELD_KEYWORDS = {
  "computer-science": ["computer science","cs","software","coding","programming"],
  "ai-ml": ["ai","machine learning","ml","artificial intelligence"],
  "engineering": ["engineering","engineer"],
  "medicine": ["medicine","medical","mbbs","doctor"],
  "business": ["business","mba","finance","management"],
  "economics": ["economics","econ"],
  "law": ["law","llb","legal"],
  "physics": ["physics"],
  "arts": ["arts","humanities","psychology","sociology"],
};

function parseQuery(q){
  const lower = q.toLowerCase();
  let countries = [];
  Object.keys(REGION_MAP).forEach(key => { if (lower.includes(key)) countries.push(...REGION_MAP[key]); });
  countries = [...new Set(countries)];

  let field = null;
  Object.keys(FIELD_KEYWORDS).forEach(f => { if (FIELD_KEYWORDS[f].some(kw => lower.includes(kw))) field = f; });

  let maxBudget = null;
  const kMatch = lower.match(/\$?\s?(\d{1,3})\s?k/);
  const dollarMatch = lower.match(/\$\s?(\d{1,3}[,.]?\d{0,3})/);
  if (kMatch) maxBudget = parseInt(kMatch[1],10) * 1000;
  else if (dollarMatch) maxBudget = parseInt(dollarMatch[1].replace(/[,.]/g,""),10);

  const affordable = /afford|cheap|budget|low cost|low-cost/.test(lower);
  if (affordable && !maxBudget) maxBudget = 20000;

  return { countries, field, maxBudget };
}

/* ---------- Blog ----------
   Cover art is built from CSS/typography, not photos — keeps the
   site copyright-safe and on-brand without needing an image pipeline. */
const BLOG_POSTS = [
  {
    id: "top-10-high-demand-careers-bd",
    title: "Top 10 High-Demand Careers in Bangladesh (and How to Prepare for Them)",
    excerpt: "From software engineering to renewable energy, here's what's actually hiring in Bangladesh right now — and the subjects that get you there.",
    category: "Careers",
    date: "2026-06-18",
    readTime: "7 min read",
    cover: { kind:"number", big:"10", label:"HIGH-DEMAND CAREERS IN BANGLADESH", sub:"AND HOW TO PREPARE FOR THEM", theme:"orange" },
    body: [
      { h:"Why local demand matters even if you're eyeing study abroad" },
      { p:"Even students planning to study overseas benefit from knowing what Bangladesh's own job market rewards — it shapes which majors travel well back home, and which scholarships and return-service programs are worth chasing." },
      { h:"The list" },
      { p:"Software & AI engineering, data analysis, renewable energy engineering, RMG-sector supply chain management, digital marketing, actuarial science, public health, agritech, fintech compliance, and UX design consistently top hiring reports from local recruiters." },
      { h:"How to prepare while still in HSC or A-Levels" },
      { p:"Prioritise Higher Mathematics and Physics if you're eyeing engineering or data tracks; pair Accounting with Economics for fintech and actuarial paths. Build one visible project — a GitHub repo, a small business, a published article — before you apply anywhere." },
    ],
  },
  {
    id: "career-counseling-guide",
    title: "How to Choose the Right Career Counseling Service",
    excerpt: "Not all counselors are equal — here's what to actually check before you pay anyone for advice.",
    category: "Guides",
    date: "2026-05-30",
    readTime: "5 min read",
    cover: { kind:"text", big:"How to Choose the Right", highlight:"Career Counseling Service", theme:"teal" },
    body: [
      { p:"A good counselor should be able to show you their placement track record, not just promise one. Ask for anonymised outcomes from the last two admission cycles." },
      { h:"Red flags" },
      { p:"Guaranteed admission promises, pressure to decide within 24 hours, and fees that scale with 'how prestigious' a university is are all signs to walk away." },
      { h:"What free tools can replace" },
      { p:"Eligibility checking, cost estimation, and rankings comparison — the stuff counselors often charge for first — are exactly what our free tools handle. Save the paid conversation for essay strategy and interview prep." },
    ],
  },
  {
    id: "academic-counseling-tips",
    title: "Academic Counseling Tips for University Students",
    excerpt: "What good academic counseling actually looks like once you're already enrolled — not just before you apply.",
    category: "Student Life",
    date: "2026-05-12",
    readTime: "6 min read",
    cover: { kind:"text", big:"Academic Counseling Tips for", highlight:"University Students", theme:"gold" },
    body: [
      { p:"Course selection, stress management, and knowing when to switch majors are all part of good academic counseling — most students only think of it as an admissions-stage service." },
      { h:"Book office hours early" },
      { p:"Faculty advisors are consistently under-used. A 15-minute conversation in week 2 of term can save a whole semester of picking the wrong electives." },
    ],
  },
  {
    id: "chattogram-vs-dhaka-vs-rajshahi",
    title: "Chattogram vs Dhaka vs Rajshahi Universities Compared",
    excerpt: "Where you study in Bangladesh matters for cost of living, industry access, and campus culture — here's the honest comparison.",
    category: "Bangladesh",
    date: "2026-04-28",
    readTime: "8 min read",
    cover: { kind:"text", big:"Chattogram vs Dhaka vs Rajshahi:", highlight:"Universities Compared", theme:"terracotta" },
    body: [
      { h:"Dhaka" },
      { p:"Highest concentration of internship and job opportunities, but also the highest cost of living and most competitive admission tests." },
      { h:"Chattogram" },
      { p:"Strong for engineering (CUET) and maritime/trade-adjacent fields, with meaningfully lower living costs than Dhaka." },
      { h:"Rajshahi" },
      { p:"Known for a calmer campus environment and strong natural sciences programs, with the lowest cost of living of the three." },
    ],
  },
  {
    id: "best-scholarships-bd-students",
    title: "Find the Best Scholarships for Bangladeshi Students",
    excerpt: "A step-by-step guide to applying early, checking eligibility, and not leaving free money on the table.",
    category: "Scholarships",
    date: "2026-04-10",
    readTime: "9 min read",
    cover: { kind:"text", big:"How to Find", highlight:"The Perfect Scholarship", sub:"for Bangladeshi Students", theme:"gold" },
    body: [
      { h:"Start 12 months out" },
      { p:"Merit scholarship deadlines at top universities often fall 3-6 months before the general admission deadline — missing that window means missing the money even if you're admitted." },
      { h:"Where to look" },
      { p:"University financial-aid pages, government programs (MEXT, DAAD, Chevening, Commonwealth), and need-based aid at need-blind US universities are the highest-value places to start." },
      { h:"Common mistakes" },
      { p:"Applying to the university before checking its scholarship deadline, and assuming 'need-based' aid isn't available to international students — many top US schools are need-blind for all applicants." },
    ],
  },
  {
    id: "why-studying-abroad-benefits-bd-students",
    title: "7 Benefits of Studying Abroad for Bangladeshi Students",
    excerpt: "Beyond the degree: what actually changes when you study outside Bangladesh, and what doesn't.",
    category: "Study Abroad",
    date: "2026-03-22",
    readTime: "6 min read",
    cover: { kind:"number", big:"7", label:"BENEFITS OF STUDYING ABROAD", sub:"FOR BANGLADESHI STUDENTS", theme:"teal" },
    body: [
      { p:"Global exposure, stronger research infrastructure, post-study work visas, and international peer networks are the most commonly cited benefits — but they come with real trade-offs in cost and distance from family." },
      { h:"What doesn't automatically improve" },
      { p:"A degree abroad doesn't guarantee a better starting salary if you return to Bangladesh — the sector and role matter more than the passport stamp on your degree." },
    ],
  },
  {
    id: "cs-universities-in-bangladesh",
    title: "Top Computer Science Universities in Bangladesh",
    excerpt: "Comparing CSE programs across public and private universities on faculty, tuition, and placement.",
    category: "Bangladesh",
    date: "2026-03-05",
    readTime: "7 min read",
    cover: { kind:"text", big:"List of Universities in Bangladesh for", highlight:"Computer Science", theme:"orange" },
    body: [
      { p:"BUET remains the most research-oriented option; NSU and BRACU offer the largest industry-linked CSE cohorts among private universities; SUST is known for a strong green campus and growing CSE research output." },
      { h:"What to actually compare" },
      { p:"Faculty-to-student ratio in CSE specifically, access to research groups, and verified placement data — not just overall university ranking." },
    ],
  },
  {
    id: "international-students-studying-in-bd",
    title: "8 Tips for International Students Studying in Bangladesh",
    excerpt: "Bangladesh is increasingly a destination too — here's what incoming international students should know.",
    category: "Student Life",
    date: "2026-02-14",
    readTime: "5 min read",
    cover: { kind:"number", big:"8", label:"TIPS FOR INTERNATIONAL STUDENTS", sub:"STUDYING IN BANGLADESH", theme:"gold" },
    body: [
      { p:"Visa extensions, local SIM registration, and finding halal/dietary-appropriate meal plans are the most common early friction points for incoming students." },
    ],
  },
  {
    id: "how-to-read-rankings",
    title: "How to Read a University Ranking (QS vs THE vs ARWU, Explained)",
    excerpt: "The four major ranking systems measure different things — here's what each one actually rewards.",
    category: "Guides",
    date: "2026-01-29",
    readTime: "6 min read",
    cover: { kind:"text", big:"QS, THE, US News, ARWU:", highlight:"What Each Ranking Actually Measures", theme:"terracotta" },
    body: [
      { h:"QS" },
      { p:"Weights academic and employer reputation surveys heavily — good for gauging brand recognition." },
      { h:"THE (Times Higher Education)" },
      { p:"Leans more on research citations and income — better signal for research-heavy postgraduate paths." },
      { h:"ARWU (Shanghai Ranking)" },
      { p:"Almost entirely research-output and Nobel/Fields-medal-linked — least useful for undergraduate teaching quality, most useful for research strength." },
      { h:"US News" },
      { p:"Blends outcomes data (graduation rate, faculty resources) — closer to a US-centric teaching-quality signal." },
      { p:"Use all four together: a school that ranks well across every system is more reliably strong than one that only tops a single list." },
    ],
  },
];
