// Local SR catalog snapshot from the user-provided Orange SR Encyclopedia URL.
// Snapshot captured 2026-10-18. Data only; the source JavaScript is never executed.
// Fields: c=code, ta=Arabic title, te=English title, k=category, da=description, r=review flag, steps=plain-text procedure.
const SR_DATA = [
  {
    "c": "4195",
    "ta": "شحن كروت الكهرباء عن طريق أورانج كاش",
    "te": "Orange Cash - Electricity Recharge",
    "k": "Orange Cash",
    "da": "SR خاص بشحن كروت الكهرباء من خلال محفظة أورانج كاش.",
    "r": false,
    "steps": "SR خاص بشحن كروت الكهرباء من خلال محفظة أورانج كاش."
  },
  {
    "c": "11102 / 11309",
    "ta": "إظهار اسم المتصل",
    "te": "CNAM FEATURE",
    "k": "VAS",
    "da": "إضافة خدمة إظهار اسم المتصل (CNAM) لكل من الأفراد والشركات.",
    "r": false,
    "steps": "• بالنسبة للأفراد:\nيتم عمل SR رقم 11102 أو 11309 (حسب حالة الخط bared أم لا).\nالمرفقات: (صورة بطاقة العميل + عقد المكالمات الترويجية بعد ملئه وتوقيعه) في ملف PDF واحد.\n\n• بالنسبة للشركات:\nيتم عمل SR رقم 11102.\nالمرفقات: (بطاقة العميل + عقد تقديم الخدمات الترويجية) في ملف PDF واحد.\nإجراء إضافي: يجب إرسال إيميل إلى sarah.m.mamdouh.ext@orange.com لطلب إضافة الخدمة للخط، وإرفاق ملف الـ PDF وملف Excel ببيانات الحساب."
  },
  {
    "c": "50113 / 50807",
    "ta": "إنهاء التعاقد / إلغاء الخط",
    "te": "termination Line",
    "k": "Termination",
    "da": "هندفع billed+unbilled وتحصيل كافة المستحقات قبل إنهاء التعاقد.",
    "r": false,
    "steps": "• خطوات التنفيذ:\n1. يتم حساب كافة المبالغ المستحقة على العميل (Billed + Unbilled) باستخدام الـ Postpaid Calculator.\n2. التأكد من تحصيل المبالغ بالكامل قبل البدء في الإجراء.\n3. يتم عمل SR Termination برقم 50113 أو 50807.\n\n• المرفقات المطلوبة:\n- صورة بطاقة العميل.\n- إقرار إنهاء التعاقد موقع من العميل."
  },
  {
    "c": "1001",
    "ta": "",
    "te": "DSL Outbound Campaign - Activation Call",
    "k": "DSL",
    "da": "DSL Outbound Campaign - Activation Call.",
    "r": true,
    "steps": "DSL Outbound Campaign - Activation Call."
  },
  {
    "c": "423001",
    "ta": "",
    "te": "DSL G Info - VAS Request For Information",
    "k": "DSL",
    "da": "DSL G Info For VAS - Request For Information.",
    "r": true,
    "steps": "DSL G Info For VAS - Request For Information."
  },
  {
    "c": "422001",
    "ta": "",
    "te": "DSL G Info - Termination Request",
    "k": "DSL",
    "da": "DSL G Info For Termination - Terminate Service.",
    "r": true,
    "steps": "DSL G Info For Termination - Terminate Service."
  },
  {
    "c": "421011",
    "ta": "",
    "te": "Complaint Handling - Acc Mod For Sales Team",
    "k": "Complaint Handling",
    "da": "Acc mod for sales team.",
    "r": true,
    "steps": "Acc mod for sales team."
  },
  {
    "c": "421010",
    "ta": "إنهاء تعاقد 10 خطوط",
    "te": "Termination - 10 Lines",
    "k": "Termination",
    "da": "When a customer wants to cancel multiple lines, they write in the declaration the numbers they wish to keep and request to cancel the rest.",
    "r": false,
    "steps": "When a customer wants to cancel multiple lines, they write in the declaration the numbers they wish to keep and request to cancel the rest."
  },
  {
    "c": "421009",
    "ta": "",
    "te": "Orange Cash - Violation",
    "k": "Orange Cash",
    "da": "If there is any violation related to Orange Cash, for example, and we need to amend it and re-upload the contracts.",
    "r": true,
    "steps": "If there is any violation related to Orange Cash, for example, and we need to amend it and re-upload the contracts."
  },
  {
    "c": "421002",
    "ta": "تغيير نظام MNP",
    "te": "MNP - Tariff",
    "k": "MNP",
    "da": "When we submit the MNP request, we do it in order to select the plan, upload the attachments, and fill in the notes afterward.",
    "r": false,
    "steps": "When we submit the MNP request, we do it in order to select the plan, upload the attachments, and fill in the notes afterward."
  },
  {
    "c": "421001",
    "ta": "",
    "te": "DSL G Info - Sales Teams Address & Working Hours",
    "k": "DSL",
    "da": "DSL G Info For Sales Teams - Address And Working Hours.",
    "r": true,
    "steps": "DSL G Info For Sales Teams - Address And Working Hours."
  },
  {
    "c": "419001",
    "ta": "",
    "te": "DSL G Info - Resellers Contacts",
    "k": "DSL",
    "da": "DSL G Info For Resellers - Contacts.",
    "r": true,
    "steps": "DSL G Info For Resellers - Contacts."
  },
  {
    "c": "418015",
    "ta": "",
    "te": "DSL G Info - Configuration Username & Password",
    "k": "DSL",
    "da": "DSL G Info For Products - Configuration Username & Password.",
    "r": true,
    "steps": "DSL G Info For Products - Configuration Username & Password."
  },
  {
    "c": "418013",
    "ta": "",
    "te": "DSL G Info - Session Status",
    "k": "DSL",
    "da": "DSL G Info For Products - Session Status.",
    "r": true,
    "steps": "DSL G Info For Products - Session Status."
  },
  {
    "c": "418012",
    "ta": "",
    "te": "DSL G Info - Package Availability",
    "k": "DSL",
    "da": "DSL G Info For Products - Package Availability.",
    "r": true,
    "steps": "DSL G Info For Products - Package Availability."
  },
  {
    "c": "418011",
    "ta": "",
    "te": "DSL G Info - Card Pin Code",
    "k": "DSL",
    "da": "DSL G Info For Products - Card Pin Code.",
    "r": true,
    "steps": "DSL G Info For Products - Card Pin Code."
  },
  {
    "c": "418010",
    "ta": "",
    "te": "DSL G Info - Usage Inquiry",
    "k": "DSL",
    "da": "DSL G Info For Products - Usage Inquiry.",
    "r": true,
    "steps": "DSL G Info For Products - Usage Inquiry."
  },
  {
    "c": "418009",
    "ta": "",
    "te": "DSL G Info - Non Orange Issue",
    "k": "DSL",
    "da": "DSL G Info For Products - Non Orange Issue.",
    "r": true,
    "steps": "DSL G Info For Products - Non Orange Issue."
  },
  {
    "c": "418008",
    "ta": "",
    "te": "DSL G Info - Prices",
    "k": "DSL",
    "da": "DSL G Info For Products - Prices.",
    "r": true,
    "steps": "DSL G Info For Products - Prices."
  },
  {
    "c": "418007",
    "ta": "",
    "te": "DSL G Info - Consumption Info",
    "k": "DSL",
    "da": "DSL G Info For Products - Consumption Info.",
    "r": true,
    "steps": "DSL G Info For Products - Consumption Info."
  },
  {
    "c": "418006",
    "ta": "",
    "te": "DSL G Info - Fair Usage Policy",
    "k": "DSL",
    "da": "DSL G Info For Products - Fair Usage Policy.",
    "r": true,
    "steps": "DSL G Info For Products - Fair Usage Policy."
  },
  {
    "c": "418005",
    "ta": "",
    "te": "DSL G Info - New Packages",
    "k": "DSL",
    "da": "DSL G Info For Products - New Packages.",
    "r": true,
    "steps": "DSL G Info For Products - New Packages."
  },
  {
    "c": "418004",
    "ta": "",
    "te": "DSL G Info - Recharging Methods",
    "k": "DSL",
    "da": "DSL G Info For Products - Recharging Methods.",
    "r": true,
    "steps": "DSL G Info For Products - Recharging Methods."
  },
  {
    "c": "418003",
    "ta": "",
    "te": "DSL G Info - Configuration",
    "k": "DSL",
    "da": "DSL G Info For Products - Configuration.",
    "r": true,
    "steps": "DSL G Info For Products - Configuration."
  },
  {
    "c": "418002",
    "ta": "",
    "te": "DSL G Info - Re-Pricing",
    "k": "DSL",
    "da": "DSL G Info For Products - Re-Pricing.",
    "r": true,
    "steps": "DSL G Info For Products - Re-Pricing."
  },
  {
    "c": "418001",
    "ta": "",
    "te": "DSL G Info - Request For Information",
    "k": "DSL",
    "da": "DSL G Info For Products - Request For Information.",
    "r": true,
    "steps": "DSL G Info For Products - Request For Information."
  },
  {
    "c": "417002",
    "ta": "",
    "te": "DSL G Info MNP - ID Copy Request",
    "k": "DSL",
    "da": "DSL G Info For MNP - ID Copy Request.",
    "r": true,
    "steps": "DSL G Info For MNP - ID Copy Request."
  },
  {
    "c": "417001",
    "ta": "",
    "te": "DSL G Info MNP - Cancellation Number",
    "k": "DSL",
    "da": "DSL G Info For MNP - Cancellation Number.",
    "r": true,
    "steps": "DSL G Info For MNP - Cancellation Number."
  },
  {
    "c": "416001",
    "ta": "",
    "te": "DSL G Info - IP & DNS",
    "k": "DSL",
    "da": "DSL G Info For PC Settings - IP & DNS.",
    "r": true,
    "steps": "DSL G Info For PC Settings - IP & DNS."
  },
  {
    "c": "415001",
    "ta": "",
    "te": "DSL G Info - Offers Request For Information",
    "k": "DSL",
    "da": "DSL G Info For Offers - Request For Information.",
    "r": true,
    "steps": "DSL G Info For Offers - Request For Information."
  },
  {
    "c": "414001",
    "ta": "",
    "te": "DSL G Info - Due Date Reminder",
    "k": "DSL",
    "da": "DSL G Info For Notification - Due Date Reminder.",
    "r": true,
    "steps": "DSL G Info For Notification - Due Date Reminder."
  },
  {
    "c": "413003",
    "ta": "",
    "te": "DSL G Info Migration - From Reseller To Orange",
    "k": "DSL",
    "da": "DSL G Info For Migration - From Reseller To Orange.",
    "r": true,
    "steps": "DSL G Info For Migration - From Reseller To Orange."
  },
  {
    "c": "412002",
    "ta": "",
    "te": "DSL G Info Line Status - Activation Step",
    "k": "DSL",
    "da": "DSL G Info For Line Status - Activation Step.",
    "r": true,
    "steps": "DSL G Info For Line Status - Activation Step."
  },
  {
    "c": "412001",
    "ta": "",
    "te": "DSL G Info Line Status - Claims Paid",
    "k": "DSL",
    "da": "DSL G Info For Line Status - Claims Paid.",
    "r": true,
    "steps": "DSL G Info For Line Status - Claims Paid."
  },
  {
    "c": "411003",
    "ta": "",
    "te": "DSL G Info - Customer Harassment",
    "k": "DSL",
    "da": "DSL G Info For Customer Care - Customer Harassment.",
    "r": true,
    "steps": "DSL G Info For Customer Care - Customer Harassment."
  },
  {
    "c": "410002",
    "ta": "",
    "te": "DSL G Info Contract - Modifications Info",
    "k": "DSL",
    "da": "DSL G Info For Contract Data - Modifications Info.",
    "r": true,
    "steps": "DSL G Info For Contract Data - Modifications Info."
  },
  {
    "c": "400001",
    "ta": "",
    "te": "DSL G Info Billing - Bill Amount",
    "k": "DSL",
    "da": "DSL G Info For Billing - Bill Amount.",
    "r": true,
    "steps": "DSL G Info For Billing - Bill Amount."
  },
  {
    "c": "82801",
    "ta": "",
    "te": "DSL Termination Resellers - Signed Document",
    "k": "DSL Termination",
    "da": "DSL Termination For Resellers - Signed Termination Document.",
    "r": true,
    "steps": "DSL Termination For Resellers - Signed Termination Document."
  },
  {
    "c": "82701",
    "ta": "",
    "te": "DSL Termination Physical - Signed Document",
    "k": "DSL Termination",
    "da": "DSL Termination For Physical - Signed Termination Document.",
    "r": true,
    "steps": "DSL Termination For Physical - Signed Termination Document."
  },
  {
    "c": "82601",
    "ta": "",
    "te": "DSL Termination Per Reason - Signed Document",
    "k": "DSL Termination",
    "da": "DSL Termination For Per Reason - Signed Termination Document.",
    "r": true,
    "steps": "DSL Termination For Per Reason - Signed Termination Document."
  },
  {
    "c": "82501",
    "ta": "",
    "te": "DSL Termination Offers - Signed Document",
    "k": "DSL Termination",
    "da": "DSL Termination For Offers - Signed Termination Document.",
    "r": true,
    "steps": "DSL Termination For Offers - Signed Termination Document."
  },
  {
    "c": "82401",
    "ta": "",
    "te": "DSL Termination Inv. Susp. - Billing Issue",
    "k": "DSL Termination",
    "da": "DSL Termination For Inv. Susp. - Billing Issue.",
    "r": true,
    "steps": "DSL Termination For Inv. Susp. - Billing Issue."
  },
  {
    "c": "82301",
    "ta": "",
    "te": "DSL Termination Cust. Serv - Signed Document",
    "k": "DSL Termination",
    "da": "DSL Termination For Cust. Serv - Signed Termination Document.",
    "r": true,
    "steps": "DSL Termination For Cust. Serv - Signed Termination Document."
  },
  {
    "c": "82102",
    "ta": "",
    "te": "DSL Termination Comp Offer - Threat To Disconnect",
    "k": "DSL Termination",
    "da": "DSL Termination For Comp Offer - Threat To Disconnect.",
    "r": true,
    "steps": "DSL Termination For Comp Offer - Threat To Disconnect."
  },
  {
    "c": "82101",
    "ta": "",
    "te": "DSL Termination Comp Offer - Signed Document",
    "k": "DSL Termination",
    "da": "DSL Termination For Comp Offer - Signed Termination Document.",
    "r": true,
    "steps": "DSL Termination For Comp Offer - Signed Termination Document."
  },
  {
    "c": "82001",
    "ta": "",
    "te": "DSL Termination Billing - Signed Document",
    "k": "DSL Termination",
    "da": "DSL Termination For Billing - Signed Termination Document.",
    "r": true,
    "steps": "DSL Termination For Billing - Signed Termination Document."
  },
  {
    "c": "71005",
    "ta": "",
    "te": "POS Acc Mod - Activate Applications",
    "k": "POS",
    "da": "POS Acc Mod for Applications - Activate.",
    "r": true,
    "steps": "POS Acc Mod for Applications - Activate."
  },
  {
    "c": "50810",
    "ta": "",
    "te": "Termination - Personal Reasons Less 3M",
    "k": "Termination",
    "da": "Termination For Pers Reasons - Less Than 3M Signed Term. Doc.",
    "r": true,
    "steps": "Termination For Pers Reasons - Less Than 3M Signed Term. Doc."
  },
  {
    "c": "50113",
    "ta": "",
    "te": "Termination - Billing / Signed Document",
    "k": "Termination",
    "da": "When customer terminates his Home 4G and gets his insurance back. Signed Termination Documents.",
    "r": true,
    "steps": "When customer terminates his Home 4G and gets his insurance back. Signed Termination Documents."
  },
  {
    "c": "41943",
    "ta": "",
    "te": "DSL G Info - New Sales Lead",
    "k": "DSL",
    "da": "DSL G Info For Products - New sales lead.",
    "r": true,
    "steps": "DSL G Info For Products - New sales lead."
  },
  {
    "c": "40021",
    "ta": "",
    "te": "DSL Fault Connectivity - Username Taken",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - Username Taken.",
    "r": true,
    "steps": "DSL Fault For Connectivity - Username Taken."
  },
  {
    "c": "40019",
    "ta": "",
    "te": "DSL Fault Connectivity - Access Point Unstable",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - Access Point Unstable.",
    "r": true,
    "steps": "DSL Fault For Connectivity - Access Point Unstable."
  },
  {
    "c": "40018",
    "ta": "",
    "te": "DSL Fault Connectivity - Access Point Down",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - Access Point Down.",
    "r": true,
    "steps": "DSL Fault For Connectivity - Access Point Down."
  },
  {
    "c": "40017",
    "ta": "",
    "te": "DSL Fault Connectivity - Coverage Issue",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - Coverage Issue.",
    "r": true,
    "steps": "DSL Fault For Connectivity - Coverage Issue."
  },
  {
    "c": "40016",
    "ta": "",
    "te": "DSL Fault Connectivity - TE-Redirection",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - TE-Redirection.",
    "r": true,
    "steps": "DSL Fault For Connectivity - TE-Redirection."
  },
  {
    "c": "40015",
    "ta": "",
    "te": "DSL Fault Connectivity - Slow Upload",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - Slow Upload.",
    "r": true,
    "steps": "DSL Fault For Connectivity - Slow Upload."
  },
  {
    "c": "40014",
    "ta": "",
    "te": "DSL Fault Connectivity - Slow Download",
    "k": "DSL Fault",
    "da": "Customer complaining that he has slow connection on his home internet.",
    "r": true,
    "steps": "Customer complaining that he has slow connection on his home internet."
  },
  {
    "c": "40013",
    "ta": "",
    "te": "DSL Fault Connectivity - No Browsing",
    "k": "DSL Fault",
    "da": "Customer complaining that he cannot browse through his home internet.",
    "r": true,
    "steps": "Customer complaining that he cannot browse through his home internet."
  },
  {
    "c": "40012",
    "ta": "",
    "te": "DSL Fault Connectivity - Connection Unstable",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - Connection Unstable.",
    "r": true,
    "steps": "DSL Fault For Connectivity - Connection Unstable."
  },
  {
    "c": "40011",
    "ta": "",
    "te": "DSL Fault Connectivity - Quality Of Service",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - Quality Of Service.",
    "r": true,
    "steps": "DSL Fault For Connectivity - Quality Of Service."
  },
  {
    "c": "40010",
    "ta": "",
    "te": "DSL Fault Connectivity - Bit Rate Mismatch",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - Bit Rate Mismatch.",
    "r": true,
    "steps": "DSL Fault For Connectivity - Bit Rate Mismatch."
  },
  {
    "c": "40001",
    "ta": "",
    "te": "DSL Fault Connectivity - Redirection Unknown",
    "k": "DSL Fault",
    "da": "DSL Fault For Connectivity - Redirection-Unknown.",
    "r": true,
    "steps": "DSL Fault For Connectivity - Redirection-Unknown."
  },
  {
    "c": "39015",
    "ta": "",
    "te": "DSL Fault Physical - Wire Problem",
    "k": "DSL Fault",
    "da": "DSL Fault For Physical - Wire Problem.",
    "r": true,
    "steps": "DSL Fault For Physical - Wire Problem."
  },
  {
    "c": "39014",
    "ta": "",
    "te": "DSL Fault Physical - Wrong Port",
    "k": "DSL Fault",
    "da": "DSL Fault For Physical - Wrong Port.",
    "r": true,
    "steps": "DSL Fault For Physical - Wrong Port."
  },
  {
    "c": "39013",
    "ta": "",
    "te": "DSL Fault Physical - Bad Line",
    "k": "DSL Fault",
    "da": "DSL Fault For Physical - Bad Line.",
    "r": true,
    "steps": "DSL Fault For Physical - Bad Line."
  },
  {
    "c": "39012",
    "ta": "",
    "te": "DSL Fault Physical - Line Unstable",
    "k": "DSL Fault",
    "da": "DSL Fault For Physical - Line Unstable.",
    "r": true,
    "steps": "DSL Fault For Physical - Line Unstable."
  },
  {
    "c": "39011",
    "ta": "",
    "te": "DSL Fault Physical - Voice Line Problem",
    "k": "DSL Fault",
    "da": "DSL Fault For Physical - Voice Line Problem.",
    "r": true,
    "steps": "DSL Fault For Physical - Voice Line Problem."
  },
  {
    "c": "39010",
    "ta": "",
    "te": "DSL Fault Physical - Splitter Problem",
    "k": "DSL Fault",
    "da": "DSL Fault For Physical - Splitter Problem.",
    "r": true,
    "steps": "DSL Fault For Physical - Splitter Problem."
  },
  {
    "c": "39001",
    "ta": "",
    "te": "DSL Fault Physical - Port Number Not Exists",
    "k": "DSL Fault",
    "da": "DSL Fault For Physical - Port Number Not Exists.",
    "r": true,
    "steps": "DSL Fault For Physical - Port Number Not Exists."
  },
  {
    "c": "38001",
    "ta": "",
    "te": "DSL Fault Portal - Cant View Invoices",
    "k": "DSL Fault",
    "da": "DSL Fault For Portal - Cant View Invoices.",
    "r": true,
    "steps": "DSL Fault For Portal - Cant View Invoices."
  },
  {
    "c": "37021",
    "ta": "",
    "te": "DSL Fault VAS - Extra Quota Dispute",
    "k": "DSL Fault",
    "da": "DSL Fault For VAS - Extra Quota Dispute.",
    "r": true,
    "steps": "DSL Fault For VAS - Extra Quota Dispute."
  },
  {
    "c": "37019",
    "ta": "",
    "te": "DSL Fault VAS - Extra Key Purchasing",
    "k": "DSL Fault",
    "da": "DSL Fault For VAS - Extra Key Purchasing.",
    "r": true,
    "steps": "DSL Fault For VAS - Extra Key Purchasing."
  },
  {
    "c": "37018",
    "ta": "",
    "te": "DSL Fault VAS - Suspended Key",
    "k": "DSL Fault",
    "da": "DSL Fault For VAS - Suspended Key.",
    "r": true,
    "steps": "DSL Fault For VAS - Suspended Key."
  },
  {
    "c": "37017",
    "ta": "",
    "te": "DSL Fault VAS - Not Eligible",
    "k": "DSL Fault",
    "da": "DSL Fault For VAS - Not Eligible.",
    "r": true,
    "steps": "DSL Fault For VAS - Not Eligible."
  },
  {
    "c": "37016",
    "ta": "",
    "te": "DSL Fault VAS - Quota Redirection Page",
    "k": "DSL Fault",
    "da": "DSL Fault For VAS - Quota Redirection Page.",
    "r": true,
    "steps": "DSL Fault For VAS - Quota Redirection Page."
  },
  {
    "c": "37014",
    "ta": "",
    "te": "DSL Fault VAS - Quota Renewal Problem",
    "k": "DSL Fault",
    "da": "DSL Fault For VAS - Quota Renewal Problem.",
    "r": true,
    "steps": "DSL Fault For VAS - Quota Renewal Problem."
  },
  {
    "c": "37013",
    "ta": "",
    "te": "DSL Fault VAS - Quality Of Service",
    "k": "DSL Fault",
    "da": "DSL Fault For VAS - Quality Of Service.",
    "r": true,
    "steps": "DSL Fault For VAS - Quality Of Service."
  },
  {
    "c": "37011",
    "ta": "",
    "te": "DSL Fault VAS - Service Added Without Request",
    "k": "DSL Fault",
    "da": "DSL Fault For VAS - Service Added Without Request.",
    "r": true,
    "steps": "DSL Fault For VAS - Service Added Without Request."
  },
  {
    "c": "37001",
    "ta": "",
    "te": "DSL Fault VAS - Status Not Updated",
    "k": "DSL Fault",
    "da": "DSL Fault For VAS - Status Not Updated N/A.",
    "r": true,
    "steps": "DSL Fault For VAS - Status Not Updated N/A."
  },
  {
    "c": "34011",
    "ta": "",
    "te": "Fault DSL - Corp Technical Problem",
    "k": "Fault",
    "da": "Customer complaints from technical issue on his home internet service (Corp).",
    "r": true,
    "steps": "Customer complaints from technical issue on his home internet service (Corp)."
  },
  {
    "c": "34010",
    "ta": "",
    "te": "Fault DSL - Personal Technical Problem",
    "k": "Fault",
    "da": "Customer complaints from technical issue on his home internet service (IND).",
    "r": true,
    "steps": "Customer complaints from technical issue on his home internet service (IND)."
  },
  {
    "c": "33501",
    "ta": "",
    "te": "DSL Fault Activation - Redirection Page Error",
    "k": "DSL Fault",
    "da": "DSL Fault For Activation - Redirection Page Error.",
    "r": true,
    "steps": "DSL Fault For Activation - Redirection Page Error."
  },
  {
    "c": "33310",
    "ta": "",
    "te": "DSL Fault Line Changes - MSAN Call",
    "k": "DSL Fault",
    "da": "DSL Fault For Line Changes - MSAN Call.",
    "r": true,
    "steps": "DSL Fault For Line Changes - MSAN Call."
  },
  {
    "c": "33301",
    "ta": "",
    "te": "DSL Fault Line Changes - Wrong Activation Date",
    "k": "DSL Fault",
    "da": "DSL Fault For Line Changes - Wrong Activation Date.",
    "r": true,
    "steps": "DSL Fault For Line Changes - Wrong Activation Date."
  },
  {
    "c": "33201",
    "ta": "",
    "te": "DSL Fault Offers - Offer Duration",
    "k": "DSL Fault",
    "da": "DSL Fault For Offers - Offer Duration.",
    "r": true,
    "steps": "DSL Fault For Offers - Offer Duration."
  },
  {
    "c": "33130",
    "ta": "",
    "te": "DSL Fault Billing - Orange Cash Payment Dispute",
    "k": "DSL Fault",
    "da": "Customer complaining that he paid through orange money and payment not reflected.",
    "r": true,
    "steps": "Customer complaining that he paid through orange money and payment not reflected."
  },
  {
    "c": "33121",
    "ta": "",
    "te": "DSL Fault Billing - MSAN Adjustment Cancelled",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - MSAN Adjustment Cancelled.",
    "r": true,
    "steps": "DSL Fault For Billing - MSAN Adjustment Cancelled."
  },
  {
    "c": "33120",
    "ta": "",
    "te": "DSL Fault Billing - Discount Not Added",
    "k": "DSL Fault",
    "da": "Customer complaining that discount is not added.",
    "r": true,
    "steps": "Customer complaining that discount is not added."
  },
  {
    "c": "33119",
    "ta": "",
    "te": "DSL Fault Billing - Refund",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Refund.",
    "r": true,
    "steps": "DSL Fault For Billing - Refund."
  },
  {
    "c": "33118",
    "ta": "",
    "te": "DSL Fault Billing - Down Payment Dispute",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Down Payment Dispute.",
    "r": true,
    "steps": "DSL Fault For Billing - Down Payment Dispute."
  },
  {
    "c": "33117",
    "ta": "",
    "te": "DSL Fault Billing - MSAN Financial Adjustment",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - MSAN Financial Adjustment.",
    "r": true,
    "steps": "DSL Fault For Billing - MSAN Financial Adjustment."
  },
  {
    "c": "33116",
    "ta": "",
    "te": "DSL Fault Billing - Wrong Payment",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Wrong Payment.",
    "r": true,
    "steps": "DSL Fault For Billing - Wrong Payment."
  },
  {
    "c": "33115",
    "ta": "",
    "te": "DSL Fault Billing - Unapplied Item",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Unapplied Item.",
    "r": true,
    "steps": "DSL Fault For Billing - Unapplied Item."
  },
  {
    "c": "33114",
    "ta": "",
    "te": "DSL Fault Billing - Wrong Amount For Cancellation",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Wrong Amount For Cancellation.",
    "r": true,
    "steps": "DSL Fault For Billing - Wrong Amount For Cancellation."
  },
  {
    "c": "33112",
    "ta": "",
    "te": "DSL Fault Billing - Offer Not Reflected On CX",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Offer Not Reflected On CX.",
    "r": true,
    "steps": "DSL Fault For Billing - Offer Not Reflected On CX."
  },
  {
    "c": "33111",
    "ta": "",
    "te": "DSL Fault Billing - Wrong Package Amount On CX",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Wrong Package Amount On CX.",
    "r": true,
    "steps": "DSL Fault For Billing - Wrong Package Amount On CX."
  },
  {
    "c": "33109",
    "ta": "",
    "te": "DSL Fault Billing - Invoice Issued While Suspended",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Invoice Issued While Suspended.",
    "r": true,
    "steps": "DSL Fault For Billing - Invoice Issued While Suspended."
  },
  {
    "c": "33108",
    "ta": "",
    "te": "DSL Fault Billing - Wrong Bill Amount",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Wrong Bill Amount.",
    "r": true,
    "steps": "DSL Fault For Billing - Wrong Bill Amount."
  },
  {
    "c": "33107",
    "ta": "",
    "te": "DSL Fault Billing - Payment Dispute",
    "k": "DSL Fault",
    "da": "Customer complaining from payment dispute.",
    "r": true,
    "steps": "Customer complaining from payment dispute."
  },
  {
    "c": "33105",
    "ta": "",
    "te": "DSL Fault Billing - Offer Discount Dispute",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Offer Discount Dispute.",
    "r": true,
    "steps": "DSL Fault For Billing - Offer Discount Dispute."
  },
  {
    "c": "33104",
    "ta": "",
    "te": "DSL Fault Billing - Online Payment Dispute",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Online Payment Dispute.",
    "r": true,
    "steps": "DSL Fault For Billing - Online Payment Dispute."
  },
  {
    "c": "33103",
    "ta": "",
    "te": "DSL Fault Billing - Wrong VAT",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Wrong VAT.",
    "r": true,
    "steps": "DSL Fault For Billing - Wrong VAT."
  },
  {
    "c": "33102",
    "ta": "",
    "te": "DSL Fault Billing - Duration Compensation Dispute",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Duration Compensation Dispute.",
    "r": true,
    "steps": "DSL Fault For Billing - Duration Compensation Dispute."
  },
  {
    "c": "33101",
    "ta": "",
    "te": "DSL Fault Billing - Invoice Not Issued",
    "k": "DSL Fault",
    "da": "DSL Fault For Billing - Invoice Not Issued.",
    "r": true,
    "steps": "DSL Fault For Billing - Invoice Not Issued."
  },
  {
    "c": "32216",
    "ta": "",
    "te": "DSL Acc Mod Products - Duration Compensation",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Products - Duration Compensation.",
    "r": true,
    "steps": "DSL Acc Mod For Products - Duration Compensation."
  },
  {
    "c": "32215",
    "ta": "",
    "te": "DSL Acc Mod Products - NOC Technical Visit",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Products - NOC Technical Visit.",
    "r": true,
    "steps": "DSL Acc Mod For Products - NOC Technical Visit."
  },
  {
    "c": "32214",
    "ta": "",
    "te": "DSL Acc Mod Products - Bad Device",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Products - Bad Device.",
    "r": true,
    "steps": "DSL Acc Mod For Products - Bad Device."
  },
  {
    "c": "32213",
    "ta": "",
    "te": "DSL Acc Mod Products - Router Not Delivered Reseller",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Products - Router Not Delivered-Reseller.",
    "r": true,
    "steps": "DSL Acc Mod For Products - Router Not Delivered-Reseller."
  },
  {
    "c": "32212",
    "ta": "",
    "te": "DSL Acc Mod Products - Router Not Delivered Direct",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Products - Router Not Delivered-Direct.",
    "r": true,
    "steps": "DSL Acc Mod For Products - Router Not Delivered-Direct."
  },
  {
    "c": "32211",
    "ta": "",
    "te": "DSL Acc Mod Products - Cards Issues",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Products - Cards Issues.",
    "r": true,
    "steps": "DSL Acc Mod For Products - Cards Issues."
  },
  {
    "c": "32210",
    "ta": "",
    "te": "DSL Acc Mod Products - Cant Subscribe",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Products - Cant Subscribe.",
    "r": true,
    "steps": "DSL Acc Mod For Products - Cant Subscribe."
  },
  {
    "c": "32101",
    "ta": "",
    "te": "Fault VAS - Orange Cash Merchant Complaint",
    "k": "Fault",
    "da": "In case CS is complaining from merchant service.",
    "r": true,
    "steps": "In case CS is complaining from merchant service."
  },
  {
    "c": "32019",
    "ta": "",
    "te": "Fault VAS - URL Not Received",
    "k": "Fault",
    "da": "In case CS is complaining that he didn't receive URL for Virtual IVR.",
    "r": true,
    "steps": "In case CS is complaining that he didn't receive URL for Virtual IVR."
  },
  {
    "c": "32018",
    "ta": "",
    "te": "Fault VAS - UPG Reset Password",
    "k": "Fault",
    "da": "In case POS is complaining that he can't reset UPG password.",
    "r": true,
    "steps": "In case POS is complaining that he can't reset UPG password."
  },
  {
    "c": "32017",
    "ta": "",
    "te": "Fault VAS - Delivery Issue",
    "k": "Fault",
    "da": "In case CS is complaining from delivery issue for merchant service.",
    "r": true,
    "steps": "In case CS is complaining from delivery issue for merchant service."
  },
  {
    "c": "32016",
    "ta": "",
    "te": "Fault VAS - Refund Problem",
    "k": "Fault",
    "da": "In case CS is complaining that he had refund issue through merchant service.",
    "r": true,
    "steps": "In case CS is complaining that he had refund issue through merchant service."
  },
  {
    "c": "32010",
    "ta": "",
    "te": "Fault VAS - USSD Purchasing Problem",
    "k": "Fault",
    "da": "In case CS can't purchase through USSD.",
    "r": true,
    "steps": "In case CS can't purchase through USSD."
  },
  {
    "c": "32004",
    "ta": "",
    "te": "DSL Fault Customer Care - Wrong Info",
    "k": "DSL Fault",
    "da": "Customer complaining from wrong info said by 16333.",
    "r": true,
    "steps": "Customer complaining from wrong info said by 16333."
  },
  {
    "c": "32003",
    "ta": "",
    "te": "DSL Fault Customer Care - Wrong Action",
    "k": "DSL Fault",
    "da": "Customer complaining from call center 16333 wrong action.",
    "r": true,
    "steps": "Customer complaining from call center 16333 wrong action."
  },
  {
    "c": "32002",
    "ta": "",
    "te": "DSL Fault Customer Care - Attitude Problems",
    "k": "DSL Fault",
    "da": "Customer complaining from Call center 16333 agent attitude.",
    "r": true,
    "steps": "Customer complaining from Call center 16333 agent attitude."
  },
  {
    "c": "31915",
    "ta": "",
    "te": "Fault Orange App - Cannot Reset Password",
    "k": "Fault",
    "da": "Customer complaints that he cannot reset my orange app password.",
    "r": true,
    "steps": "Customer complaints that he cannot reset my orange app password."
  },
  {
    "c": "31914",
    "ta": "",
    "te": "Fault Orange App - Cant Pay",
    "k": "Fault",
    "da": "Customer complaints that he cannot pay through my orange app.",
    "r": true,
    "steps": "Customer complaints that he cannot pay through my orange app."
  },
  {
    "c": "31906",
    "ta": "",
    "te": "Fault Orange App - Cannot Install",
    "k": "Fault",
    "da": "Customer complaints that he cannot install my orange app.",
    "r": true,
    "steps": "Customer complaints that he cannot install my orange app."
  },
  {
    "c": "31904",
    "ta": "",
    "te": "Fault Orange App - Application Problem",
    "k": "Fault",
    "da": "Customer complaints that there is any problem related to my orange app.",
    "r": true,
    "steps": "Customer complaints that there is any problem related to my orange app."
  },
  {
    "c": "31902",
    "ta": "",
    "te": "Fault Orange App - Cannot Access",
    "k": "Fault",
    "da": "Customer complaints that he cannot access My orange app.",
    "r": true,
    "steps": "Customer complaints that he cannot access My orange app."
  },
  {
    "c": "31708",
    "ta": "",
    "te": "Fault MNP - Offer Dispute",
    "k": "MNP",
    "da": "Customer complaints that MNP offer not added.",
    "r": true,
    "steps": "Customer complaints that MNP offer not added."
  },
  {
    "c": "31707",
    "ta": "",
    "te": "Fault MNP - Cannot Make Or Receive Call",
    "k": "MNP",
    "da": "When dial ported in but cannot make or receive calls.",
    "r": true,
    "steps": "When dial ported in but cannot make or receive calls."
  },
  {
    "c": "31702",
    "ta": "",
    "te": "Fault MNP - Failed No Request",
    "k": "MNP",
    "da": "When ported in dial is active on Siebel and Pending on CX.",
    "r": true,
    "steps": "When ported in dial is active on Siebel and Pending on CX."
  },
  {
    "c": "31701",
    "ta": "",
    "te": "Fault MNP - Line Activation Problem",
    "k": "MNP",
    "da": "Customer complaints that his dial is not active and ported in.",
    "r": true,
    "steps": "Customer complaints that his dial is not active and ported in."
  },
  {
    "c": "31660",
    "ta": "",
    "te": "Fault E-Shop - Late Delivery",
    "k": "Fault",
    "da": "Customer complaining from late delivery through E-shop.",
    "r": true,
    "steps": "Customer complaining from late delivery through E-shop."
  },
  {
    "c": "31635",
    "ta": "",
    "te": "Fault Products - Renewal Through Aggregators",
    "k": "Fault",
    "da": "In case CS is complaining that he can't renew his bucket through aggregators.",
    "r": true,
    "steps": "In case CS is complaining that he can't renew his bucket through aggregators."
  },
  {
    "c": "31634",
    "ta": "",
    "te": "Fault Products - Sharing Units Members",
    "k": "Fault",
    "da": "Customer complaining that he cannot share units to members.",
    "r": true,
    "steps": "Customer complaining that he cannot share units to members."
  },
  {
    "c": "31633",
    "ta": "",
    "te": "Fault Products - Sharing Units",
    "k": "Fault",
    "da": "In case CS is complaining that he can't share his units.",
    "r": true,
    "steps": "In case CS is complaining that he can't share his units."
  },
  {
    "c": "31631",
    "ta": "",
    "te": "Fault Products - WhatsApp Wrong Charges",
    "k": "Fault",
    "da": "In case CS is complaining from whatsapp wrong charges.",
    "r": true,
    "steps": "In case CS is complaining from whatsapp wrong charges."
  },
  {
    "c": "31627",
    "ta": "",
    "te": "Fault Products - Plus Minutes Not Added",
    "k": "Fault",
    "da": "Customer complaints that Plus minutes is not added.",
    "r": true,
    "steps": "Customer complaints that Plus minutes is not added."
  },
  {
    "c": "31623",
    "ta": "",
    "te": "Fault Products - Region Bonus Wrong Charges",
    "k": "Fault",
    "da": "In case CS is complaining from wrong charges for region bonus.",
    "r": true,
    "steps": "In case CS is complaining from wrong charges for region bonus."
  },
  {
    "c": "31607",
    "ta": "",
    "te": "Fault Products - FC Membership Not Added",
    "k": "Fault",
    "da": "In case CS is complaining that FC membership not added.",
    "r": true,
    "steps": "In case CS is complaining that FC membership not added."
  },
  {
    "c": "31606",
    "ta": "",
    "te": "Fault Products - Voucher Not Added",
    "k": "Fault",
    "da": "In case CS is complaining that his voucher not added.",
    "r": true,
    "steps": "In case CS is complaining that his voucher not added."
  },
  {
    "c": "31604",
    "ta": "",
    "te": "Fault Products - Installment Problem",
    "k": "Fault",
    "da": "In case CS is complaining from issues related to his installment.",
    "r": true,
    "steps": "In case CS is complaining from issues related to his installment."
  },
  {
    "c": "31601",
    "ta": "",
    "te": "Fault Products - Features Problem",
    "k": "Fault",
    "da": "In case CS is complaining from his tariff features problems.",
    "r": true,
    "steps": "In case CS is complaining from his tariff features problems."
  },
  {
    "c": "31583",
    "ta": "",
    "te": "Fault VAS - Open Integration with Fawry",
    "k": "Fault",
    "da": "In case CS is complaining that he can't open integration with fawry.",
    "r": true,
    "steps": "In case CS is complaining that he can't open integration with fawry."
  },
  {
    "c": "31581",
    "ta": "",
    "te": "Fault VAS - Lifetime Validity",
    "k": "Fault",
    "da": "In case CS is complaining that he can't buy validity for his line.",
    "r": true,
    "steps": "In case CS is complaining that he can't buy validity for his line."
  },
  {
    "c": "31575",
    "ta": "",
    "te": "Fault VAS - Bank Wallet Problem",
    "k": "Fault",
    "da": "In case CS had issue with bank wallet.",
    "r": true,
    "steps": "In case CS had issue with bank wallet."
  },
  {
    "c": "31566",
    "ta": "",
    "te": "Fault VAS - Wallet Status",
    "k": "Fault",
    "da": "In case CS is complaining from his wallet status.",
    "r": true,
    "steps": "In case CS is complaining from his wallet status."
  },
  {
    "c": "31564",
    "ta": "",
    "te": "Fault Special Program - Accrue To Problem",
    "k": "Fault",
    "da": "In case CS is complaining from accruing problem.",
    "r": true,
    "steps": "In case CS is complaining from accruing problem."
  },
  {
    "c": "31551",
    "ta": "",
    "te": "Fault VAS - USSD #114# Problem",
    "k": "Fault",
    "da": "In case CS is complaining from #114#.",
    "r": true,
    "steps": "In case CS is complaining from #114#."
  },
  {
    "c": "31545",
    "ta": "",
    "te": "Fault Special Program - Points Transfer Problem",
    "k": "Fault",
    "da": "In case CS is complaining that he can't transfer his points.",
    "r": true,
    "steps": "In case CS is complaining that he can't transfer his points."
  },
  {
    "c": "31544",
    "ta": "",
    "te": "Fault E-Shop - Website Complaint",
    "k": "Fault",
    "da": "Customer complaining from E-shop through orange website.",
    "r": true,
    "steps": "Customer complaining from E-shop through orange website."
  },
  {
    "c": "31541",
    "ta": "",
    "te": "Fault VAS - Donation Payment",
    "k": "Fault",
    "da": "In case CS had problem with donation payment through orange cash.",
    "r": true,
    "steps": "In case CS had problem with donation payment through orange cash."
  },
  {
    "c": "31536",
    "ta": "",
    "te": "Fault VAS - Add-Ons Renewal",
    "k": "Fault",
    "da": "In case CS is complaining that his Add-Ons not renewed.",
    "r": true,
    "steps": "In case CS is complaining that his Add-Ons not renewed."
  },
  {
    "c": "31531",
    "ta": "",
    "te": "Fault Special Program - Enrolment Delay",
    "k": "Fault",
    "da": "In case CS is complaining from enrollment delay.",
    "r": true,
    "steps": "In case CS is complaining from enrollment delay."
  },
  {
    "c": "31529",
    "ta": "",
    "te": "Fault Special Program - Points Not Added",
    "k": "Fault",
    "da": "In case CS is complaining that his points not added.",
    "r": true,
    "steps": "In case CS is complaining that his points not added."
  },
  {
    "c": "31524",
    "ta": "",
    "te": "Fault Special Program - External Partners",
    "k": "Fault",
    "da": "In case CS is complaining from external partners attitude.",
    "r": true,
    "steps": "In case CS is complaining from external partners attitude."
  },
  {
    "c": "31523",
    "ta": "",
    "te": "Fault Special Program - EA Loyalty Problem",
    "k": "Fault",
    "da": "In case CS is complaining from points issue related to Egypt Air.",
    "r": true,
    "steps": "In case CS is complaining from points issue related to Egypt Air."
  },
  {
    "c": "31520",
    "ta": "",
    "te": "Fault Special Program - OrangeDSL Points Not Added",
    "k": "Fault",
    "da": "When customer complaints that orange dsl points are not added to his main dial (Same user).",
    "r": true,
    "steps": "When customer complaints that orange dsl points are not added to his main dial (Same user)."
  },
  {
    "c": "31515",
    "ta": "",
    "te": "Fault Special Program - Redemption Problem",
    "k": "Fault",
    "da": "In case CS is complaining from redemption issues for points.",
    "r": true,
    "steps": "In case CS is complaining from redemption issues for points."
  },
  {
    "c": "31512",
    "ta": "",
    "te": "Fault Special Program - SMS Not Delivered",
    "k": "Fault",
    "da": "In case CS is complaining that he didn't receive SMS related to expired points, voucher, etc.",
    "r": true,
    "steps": "In case CS is complaining that he didn't receive SMS related to expired points, voucher, etc."
  },
  {
    "c": "31510",
    "ta": "",
    "te": "Fault Special Program - Points Dispute",
    "k": "Fault",
    "da": "In case CS is complaining from points that added to him.",
    "r": true,
    "steps": "In case CS is complaining from points that added to him."
  },
  {
    "c": "31509",
    "ta": "",
    "te": "Fault VAS - Tango Tool Problem",
    "k": "Fault",
    "da": "In case POS is complaining that he had issue with tango tool.",
    "r": true,
    "steps": "In case POS is complaining that he had issue with tango tool."
  },
  {
    "c": "31508",
    "ta": "",
    "te": "Fault Special Program - IVR Problem",
    "k": "Fault",
    "da": "In case CS is complaining from Special IVR.",
    "r": true,
    "steps": "In case CS is complaining from Special IVR."
  },
  {
    "c": "31506",
    "ta": "",
    "te": "Fault VAS - USB Problems",
    "k": "Fault",
    "da": "In case CS is complaining from USB problems for Bulk SMS SIM Based.",
    "r": true,
    "steps": "In case CS is complaining from USB problems for Bulk SMS SIM Based."
  },
  {
    "c": "31505",
    "ta": "",
    "te": "Fault Special Program - Expired Points",
    "k": "Fault",
    "da": "In case CS is complaining that his points are expired.",
    "r": true,
    "steps": "In case CS is complaining that his points are expired."
  },
  {
    "c": "31504",
    "ta": "",
    "te": "Fault Special Program - Different Tier",
    "k": "Fault",
    "da": "In case CS is complaining from his tier.",
    "r": true,
    "steps": "In case CS is complaining from his tier."
  },
  {
    "c": "31503",
    "ta": "",
    "te": "Fault VAS - Settings Problem",
    "k": "Fault",
    "da": "In case CS is complaining from Bulk SMS setting problem.",
    "r": true,
    "steps": "In case CS is complaining from Bulk SMS setting problem."
  },
  {
    "c": "31502",
    "ta": "",
    "te": "Fault VAS - Features Problem (Corp Call Tone)",
    "k": "Fault",
    "da": "In case CS is complaining that he can't use corporate call tone features.",
    "r": true,
    "steps": "In case CS is complaining that he can't use corporate call tone features."
  },
  {
    "c": "31494",
    "ta": "",
    "te": "Fault VAS - Orange Cash Complaints",
    "k": "Fault",
    "da": "In case CS is complaining from orange cash issues.",
    "r": true,
    "steps": "In case CS is complaining from orange cash issues."
  },
  {
    "c": "31492",
    "ta": "",
    "te": "Fault VAS - Payment Problem",
    "k": "Fault",
    "da": "In case CS is complaining that he can't pay through merchant service.",
    "r": true,
    "steps": "In case CS is complaining that he can't pay through merchant service."
  },
  {
    "c": "31490",
    "ta": "",
    "te": "Fault VAS - Deleted On Tool & Still Active",
    "k": "Fault",
    "da": "When customer complaints that service is deactive on tool and still working on his dial as call tone - alerting.",
    "r": true,
    "steps": "When customer complaints that service is deactive on tool and still working on his dial as call tone - alerting."
  },
  {
    "c": "31487",
    "ta": "",
    "te": "Fault VAS - Credit Not Added (Salefny)",
    "k": "Fault",
    "da": "In case CS is complaining that Salefny credit not added.",
    "r": true,
    "steps": "In case CS is complaining that Salefny credit not added."
  },
  {
    "c": "31479",
    "ta": "",
    "te": "Fault VAS - Cannot Delete",
    "k": "Fault",
    "da": "When customer complaints that he cannot delete service such as T-pay, Gaming, Gameloft, call tone.",
    "r": true,
    "steps": "When customer complaints that he cannot delete service such as T-pay, Gaming, Gameloft, call tone."
  },
  {
    "c": "31475",
    "ta": "",
    "te": "Fault VAS - Cannot Unsubscribe",
    "k": "Fault",
    "da": "In case CS is complaining that he can't unsubscribe from any services.",
    "r": true,
    "steps": "In case CS is complaining that he can't unsubscribe from any services."
  },
  {
    "c": "31473",
    "ta": "",
    "te": "Fault VAS - Cant Subscribe",
    "k": "Fault",
    "da": "In case CS is complaining that he can't subscribe in any services.",
    "r": true,
    "steps": "In case CS is complaining that he can't subscribe in any services."
  },
  {
    "c": "31463",
    "ta": "",
    "te": "Fault VAS - Balance Not Updated USSD",
    "k": "Fault",
    "da": "In case CS is complaining that his balance not updated on USSD.",
    "r": true,
    "steps": "In case CS is complaining that his balance not updated on USSD."
  },
  {
    "c": "31462",
    "ta": "",
    "te": "Fault VAS - Daily Failed Report",
    "k": "Fault",
    "da": "To be used to check daily failed actions.",
    "r": true,
    "steps": "To be used to check daily failed actions."
  },
  {
    "c": "31442",
    "ta": "",
    "te": "Fault VAS - Action Not Done U-Control",
    "k": "Fault",
    "da": "In case CS is complaining that actions not done through U-Control.",
    "r": true,
    "steps": "In case CS is complaining that actions not done through U-Control."
  },
  {
    "c": "31441",
    "ta": "",
    "te": "Fault VAS - Failed Or Pending Request",
    "k": "Fault",
    "da": "For Failed and pending request.",
    "r": true,
    "steps": "For Failed and pending request."
  },
  {
    "c": "31440",
    "ta": "",
    "te": "Fault VAS - Cannot Send And Receive SMS",
    "k": "Fault",
    "da": "In case CS is complaining that he can't send/receive SMS.",
    "r": true,
    "steps": "In case CS is complaining that he can't send/receive SMS."
  },
  {
    "c": "31428",
    "ta": "",
    "te": "Fault VAS - Budget Master Complaints",
    "k": "Fault",
    "da": "In case CS is complaining from budget master service.",
    "r": true,
    "steps": "In case CS is complaining from budget master service."
  },
  {
    "c": "31427",
    "ta": "",
    "te": "Fault VAS - Not Working Commands",
    "k": "Fault",
    "da": "In case CS is complaining that codes related to default services not working like call waiting, call forward.",
    "r": true,
    "steps": "In case CS is complaining that codes related to default services not working like call waiting, call forward."
  },
  {
    "c": "31418",
    "ta": "",
    "te": "Fault VAS - Credit Transfer",
    "k": "Fault",
    "da": "In case CS is complaining that he can't transfer credit.",
    "r": true,
    "steps": "In case CS is complaining that he can't transfer credit."
  },
  {
    "c": "31415",
    "ta": "",
    "te": "Fault VAS - Cannot Send And Receive SMS",
    "k": "Fault",
    "da": "When customer complaining that he cannot send and receive SMS.",
    "r": true,
    "steps": "When customer complaining that he cannot send and receive SMS."
  },
  {
    "c": "31409",
    "ta": "",
    "te": "Fault VAS - Cannot Make And Receive Call (Roaming)",
    "k": "Fault",
    "da": "In case CS is complaining that he can't make/receive international or roaming calls.",
    "r": true,
    "steps": "In case CS is complaining that he can't make/receive international or roaming calls."
  },
  {
    "c": "31406",
    "ta": "",
    "te": "Fault VAS - Cannot Access Network (Roaming)",
    "k": "Fault",
    "da": "In case CS is complaining that he can't access network while roaming.",
    "r": true,
    "steps": "In case CS is complaining that he can't access network while roaming."
  },
  {
    "c": "31405",
    "ta": "",
    "te": "Fault VAS - Cannot Access USSD",
    "k": "Fault",
    "da": "In case CS is complaining that he can't access USSD.",
    "r": true,
    "steps": "In case CS is complaining that he can't access USSD."
  },
  {
    "c": "31402",
    "ta": "",
    "te": "Fault VAS - E-Bill Problem",
    "k": "Fault",
    "da": "In case CS is complaining from E-Bill.",
    "r": true,
    "steps": "In case CS is complaining from E-Bill."
  },
  {
    "c": "31400",
    "ta": "",
    "te": "Fault Products - Carry Over Problem",
    "k": "Fault",
    "da": "In case CS is complaining that his units not carried over.",
    "r": true,
    "steps": "In case CS is complaining that his units not carried over."
  },
  {
    "c": "31399",
    "ta": "",
    "te": "Fault Products - Cant Add Voice Extension",
    "k": "Fault",
    "da": "In case CS is complaining that he can't add voice extension.",
    "r": true,
    "steps": "In case CS is complaining that he can't add voice extension."
  },
  {
    "c": "31397",
    "ta": "",
    "te": "Fault Products - Cant Add Favorite Number",
    "k": "Fault",
    "da": "In case CS is complaining that he can't add favorite number.",
    "r": true,
    "steps": "In case CS is complaining that he can't add favorite number."
  },
  {
    "c": "31396",
    "ta": "",
    "te": "Fault Products - Limit Not Added",
    "k": "Fault",
    "da": "In case CS is complaining that his limit not added.",
    "r": true,
    "steps": "In case CS is complaining that his limit not added."
  },
  {
    "c": "31393",
    "ta": "",
    "te": "Fault Products - Wrong Swap/Lost Credit",
    "k": "Fault",
    "da": "Customer complaining from wrong sim swap and credit lost.",
    "r": true,
    "steps": "Customer complaining from wrong sim swap and credit lost."
  },
  {
    "c": "31392",
    "ta": "",
    "te": "Fault Products - Wrong Swap",
    "k": "Fault",
    "da": "Customer complaining from wrong sim swap.",
    "r": true,
    "steps": "Customer complaining from wrong sim swap."
  },
  {
    "c": "31382",
    "ta": "",
    "te": "Fault Products - Inclusive Bucket Not Added",
    "k": "Fault",
    "da": "In case CS is complaining that his inclusive bucket not added (MINs, SMS, bonus credit, etc).",
    "r": true,
    "steps": "In case CS is complaining that his inclusive bucket not added (MINs, SMS, bonus credit, etc)."
  },
  {
    "c": "31375",
    "ta": "",
    "te": "Fault Products - Life Cycle Problem",
    "k": "Fault",
    "da": "In case CS is complaining that his line didn't pass life cycle & deactivated.",
    "r": true,
    "steps": "In case CS is complaining that his line didn't pass life cycle & deactivated."
  },
  {
    "c": "31371",
    "ta": "",
    "te": "Fault Products - Data Bucket Not Added",
    "k": "Fault",
    "da": "Customer complaining that Data bucket is not added.",
    "r": true,
    "steps": "Customer complaining that Data bucket is not added."
  },
  {
    "c": "31370",
    "ta": "",
    "te": "Fault Products - Voice Bucket Not Added",
    "k": "Fault",
    "da": "Customer complaining that Voice bucket is not added.",
    "r": true,
    "steps": "Customer complaining that Voice bucket is not added."
  },
  {
    "c": "31365",
    "ta": "",
    "te": "Fault Products - Scratch Card Problem",
    "k": "Fault",
    "da": "In case CS is complaining from Scratch card problem (expired, damaged, locked, etc).",
    "r": true,
    "steps": "In case CS is complaining from Scratch card problem (expired, damaged, locked, etc)."
  },
  {
    "c": "31364",
    "ta": "",
    "te": "Fault Products - Add-Ons Not Added",
    "k": "Fault",
    "da": "In case CS is complaining that Add-Ons not added.",
    "r": true,
    "steps": "In case CS is complaining that Add-Ons not added."
  },
  {
    "c": "31363",
    "ta": "",
    "te": "Fault Products - FB Quota Not Added",
    "k": "Fault",
    "da": "In case CS is complaining that FB quota not added to him.",
    "r": true,
    "steps": "In case CS is complaining that FB quota not added to him."
  },
  {
    "c": "31360",
    "ta": "",
    "te": "Fault Products - Validity Not Added",
    "k": "Fault",
    "da": "Customer complaints that Validity is not added.",
    "r": true,
    "steps": "Customer complaints that Validity is not added."
  },
  {
    "c": "31344",
    "ta": "",
    "te": "Fault Products - Damaged SIM",
    "k": "Fault",
    "da": "Customer complaining that sim card is not working and damaged.",
    "r": true,
    "steps": "Customer complaining that sim card is not working and damaged."
  },
  {
    "c": "31335",
    "ta": "",
    "te": "Fault Products - Cannot Make/Receive Call",
    "k": "Fault",
    "da": "In case CS is complaining that he can't make / receive calls every where.",
    "r": true,
    "steps": "In case CS is complaining that he can't make / receive calls every where."
  },
  {
    "c": "31334",
    "ta": "",
    "te": "Fault Products - No Signal Everywhere",
    "k": "Fault",
    "da": "In case CS is complaining from no signal every where.",
    "r": true,
    "steps": "In case CS is complaining from no signal every where."
  },
  {
    "c": "31331",
    "ta": "",
    "te": "Fault Products - Free Minutes Not Added",
    "k": "Fault",
    "da": "Customer complaining that free tariff minutes is not added.",
    "r": true,
    "steps": "Customer complaining that free tariff minutes is not added."
  },
  {
    "c": "31330",
    "ta": "",
    "te": "Fault Products - Bonus Not Added",
    "k": "Fault",
    "da": "Customer complaining that tariff bonus is not added.",
    "r": true,
    "steps": "Customer complaining that tariff bonus is not added."
  },
  {
    "c": "31328",
    "ta": "",
    "te": "Fault Products - Bucket Not Found On Siebel",
    "k": "Fault",
    "da": "In case CS is complaining that his bucket not found on Siebel - Charging Details.",
    "r": true,
    "steps": "In case CS is complaining that his bucket not found on Siebel - Charging Details."
  },
  {
    "c": "31319",
    "ta": "",
    "te": "Fault Products - Renewal Problem",
    "k": "Fault",
    "da": "In case CS is complaining that he can't renew his bucket.",
    "r": true,
    "steps": "In case CS is complaining that he can't renew his bucket."
  },
  {
    "c": "31316",
    "ta": "",
    "te": "Fault Products - Recharging Problem",
    "k": "Fault",
    "da": "In case CS is complaining that he can't recharge through Orange channels (fawry, website, etc).",
    "r": true,
    "steps": "In case CS is complaining that he can't recharge through Orange channels (fawry, website, etc)."
  },
  {
    "c": "31309",
    "ta": "",
    "te": "Fault Products - Dial Not Found Charging Details",
    "k": "Fault",
    "da": "In case CS is complaining that his dial is not found on Siebel - Charging details.",
    "r": true,
    "steps": "In case CS is complaining that his dial is not found on Siebel - Charging details."
  },
  {
    "c": "31307",
    "ta": "",
    "te": "Fault Products - Damaged Card",
    "k": "Fault",
    "da": "Fault For Products - Damaged Card.",
    "r": true,
    "steps": "Fault For Products - Damaged Card."
  },
  {
    "c": "31301",
    "ta": "",
    "te": "Fault Products - Cannot Make Call",
    "k": "Fault",
    "da": "Customer complaining that he cannot make calls.",
    "r": true,
    "steps": "Customer complaining that he cannot make calls."
  },
  {
    "c": "31273",
    "ta": "",
    "te": "Fault Offers - Cannot Redeem",
    "k": "Fault",
    "da": "In case CS is complaining that he can't redeem his voucher/points through Offers.",
    "r": true,
    "steps": "In case CS is complaining that he can't redeem his voucher/points through Offers."
  },
  {
    "c": "31249",
    "ta": "",
    "te": "Fault Offers - Notifications Problem",
    "k": "Fault",
    "da": "In case CS is complaining from any notification problems related to offers (can't receive, wrong notification, etc).",
    "r": true,
    "steps": "In case CS is complaining from any notification problems related to offers (can't receive, wrong notification, etc)."
  },
  {
    "c": "31241",
    "ta": "",
    "te": "Fault Offers - Offer Not Added",
    "k": "Fault",
    "da": "In case CS is complaining that offer not added although he already is subscribed.",
    "r": true,
    "steps": "In case CS is complaining that offer not added although he already is subscribed."
  },
  {
    "c": "31219",
    "ta": "",
    "te": "Fault Offers - Installment Problem",
    "k": "Fault",
    "da": "Customer complaints that he cannot use installment on his dial.",
    "r": true,
    "steps": "Customer complaints that he cannot use installment on his dial."
  },
  {
    "c": "31218",
    "ta": "",
    "te": "Fault Offers - Offer Dispute",
    "k": "Fault",
    "da": "In case CS is complaining that he was charged for offer wrongfully or from his consumption for this offer.",
    "r": true,
    "steps": "In case CS is complaining that he was charged for offer wrongfully or from his consumption for this offer."
  },
  {
    "c": "31211",
    "ta": "",
    "te": "Fault Offers - Cant Unsubscribe",
    "k": "Fault",
    "da": "In case CS is complaining that he can't unsubscribe from any offers.",
    "r": true,
    "steps": "In case CS is complaining that he can't unsubscribe from any offers."
  },
  {
    "c": "31208",
    "ta": "",
    "te": "Fault Offers - Cant Subscribe",
    "k": "Fault",
    "da": "In case CS is complaining that he can't subscribe in any offers.",
    "r": true,
    "steps": "In case CS is complaining that he can't subscribe in any offers."
  },
  {
    "c": "31201",
    "ta": "",
    "te": "Fault Offers - Bonus Not Added",
    "k": "Fault",
    "da": "Customer complaints that Bonus not added.",
    "r": true,
    "steps": "Customer complaints that Bonus not added."
  },
  {
    "c": "31016",
    "ta": "",
    "te": "Fault Network - Prospect And Candidates",
    "k": "Fault",
    "da": "When customer suggests to create a new signal coverage tower.",
    "r": true,
    "steps": "When customer suggests to create a new signal coverage tower."
  },
  {
    "c": "31014",
    "ta": "",
    "te": "Fault Network - No Signal",
    "k": "Fault",
    "da": "Customer complaining from no signal.",
    "r": true,
    "steps": "Customer complaining from no signal."
  },
  {
    "c": "31005",
    "ta": "",
    "te": "Fault Network - Cannot Make And Receive Call",
    "k": "Fault",
    "da": "Customer complaining that he cannot make or receive calls.",
    "r": true,
    "steps": "Customer complaining that he cannot make or receive calls."
  },
  {
    "c": "30901",
    "ta": "",
    "te": "Fault Billing - Data Charges",
    "k": "Fault",
    "da": "In case CS is complaining from any data charges like bucket added without request, high charges, etc.",
    "r": true,
    "steps": "In case CS is complaining from any data charges like bucket added without request, high charges, etc."
  },
  {
    "c": "30851",
    "ta": "",
    "te": "Fault Billing - Payment Within SLA",
    "k": "Fault",
    "da": "In case amount not reflected while payment not exceeded the registration SLA, this SR should be created to be automated to credit team to add the dial on hold.",
    "r": true,
    "steps": "In case amount not reflected while payment not exceeded the registration SLA, this SR should be created to be automated to credit team to add the dial on hold."
  },
  {
    "c": "30816",
    "ta": "",
    "te": "Fault Line Modification - Dial Deact By Mistake",
    "k": "Fault",
    "da": "To be used in case agent is deactivating dial by mistake.",
    "r": true,
    "steps": "To be used in case agent is deactivating dial by mistake."
  },
  {
    "c": "30815",
    "ta": "",
    "te": "Fault Line Modification - Data Registration Problem",
    "k": "Fault",
    "da": "Customer complaining that he cannot register his dial through orange website.",
    "r": true,
    "steps": "Customer complaining that he cannot register his dial through orange website."
  },
  {
    "c": "30517",
    "ta": "",
    "te": "Fault Data Services - Cannot Delete Self Channels",
    "k": "Fault",
    "da": "In case CS cannot delete the data bucket through self channels.",
    "r": true,
    "steps": "In case CS cannot delete the data bucket through self channels."
  },
  {
    "c": "30516",
    "ta": "",
    "te": "Fault Data Services - Features Problem",
    "k": "Fault",
    "da": "In case CS is complaining from features problem related to his data bucket.",
    "r": true,
    "steps": "In case CS is complaining from features problem related to his data bucket."
  },
  {
    "c": "30515",
    "ta": "",
    "te": "Fault Data Services - Cannot Reset Wi-Fi Password",
    "k": "Fault",
    "da": "In case CS is complaining that he can't reset Wi-Fi password.",
    "r": true,
    "steps": "In case CS is complaining that he can't reset Wi-Fi password."
  },
  {
    "c": "30512",
    "ta": "",
    "te": "Fault Data Services - Forced Migration",
    "k": "Fault",
    "da": "In case CS is complaining from forced migration to another data bucket.",
    "r": true,
    "steps": "In case CS is complaining from forced migration to another data bucket."
  },
  {
    "c": "30441",
    "ta": "",
    "te": "Fault Data Services - Cannot Migrate",
    "k": "Fault",
    "da": "In case CS is complaining that he can't migrate to another data bucket.",
    "r": true,
    "steps": "In case CS is complaining that he can't migrate to another data bucket."
  },
  {
    "c": "30419",
    "ta": "",
    "te": "Fault Data Services - Cannot Connect",
    "k": "Fault",
    "da": "In case CS is complaining from data connection issue.",
    "r": true,
    "steps": "In case CS is complaining from data connection issue."
  },
  {
    "c": "30413",
    "ta": "",
    "te": "Fault Data Services - Cannot Send And Receive MMS",
    "k": "Fault",
    "da": "In case CS is complaining that he can't send/receive MMS.",
    "r": true,
    "steps": "In case CS is complaining that he can't send/receive MMS."
  },
  {
    "c": "30401",
    "ta": "",
    "te": "Fault Data Services - CWS",
    "k": "Fault",
    "da": "In case CS has problem with CWS service.",
    "r": true,
    "steps": "In case CS has problem with CWS service."
  },
  {
    "c": "30329",
    "ta": "",
    "te": "Fault Sales Teams - New Selling Process",
    "k": "Fault",
    "da": "When customer wants to delete 10 dials from his name.",
    "r": true,
    "steps": "When customer wants to delete 10 dials from his name."
  },
  {
    "c": "30322",
    "ta": "",
    "te": "Fault Customer Care - Wrong Info",
    "k": "Fault",
    "da": "Customer Complaining from Wrong Info from 110/250.",
    "r": true,
    "steps": "Customer Complaining from Wrong Info from 110/250."
  },
  {
    "c": "30321",
    "ta": "",
    "te": "Fault Customer Care - Human Mistakes",
    "k": "Fault",
    "da": "To be used in case CS is complaining that he received wrong info / action from CC.",
    "r": true,
    "steps": "To be used in case CS is complaining that he received wrong info / action from CC."
  },
  {
    "c": "30310",
    "ta": "",
    "te": "Fault Customer Care - Dropped/Silent Calls",
    "k": "Fault",
    "da": "To be used in case CS is complaining from dropped / Silent calls while he is calling CC.",
    "r": true,
    "steps": "To be used in case CS is complaining from dropped / Silent calls while he is calling CC."
  },
  {
    "c": "30301",
    "ta": "",
    "te": "Fault Customer Care - Attitude Problems",
    "k": "Fault",
    "da": "To be used in case CS is complaining from agent attitude.",
    "r": true,
    "steps": "To be used in case CS is complaining from agent attitude."
  },
  {
    "c": "30251",
    "ta": "",
    "te": "Fault Billing - Bill Payment Problems",
    "k": "Fault",
    "da": "In case CS is complaining that he can't pay his bills through Fawry, Massar, Bee, etc.",
    "r": true,
    "steps": "In case CS is complaining that he can't pay his bills through Fawry, Massar, Bee, etc."
  },
  {
    "c": "30218",
    "ta": "",
    "te": "Fault Billing - Claims Paid",
    "k": "Fault",
    "da": "In case CS is complaining that he paid his bill & that not reflected on system.",
    "r": true,
    "steps": "In case CS is complaining that he paid his bill & that not reflected on system."
  },
  {
    "c": "30216",
    "ta": "",
    "te": "Fault Billing - Direct Debit Deduction",
    "k": "Fault",
    "da": "In case CS is complaining that his bills not deducted from direct debit.",
    "r": true,
    "steps": "In case CS is complaining that his bills not deducted from direct debit."
  },
  {
    "c": "30210",
    "ta": "",
    "te": "Fault Billing - Local Charges Dispute",
    "k": "Fault",
    "da": "Customer Complaining From Local Calls Dispute.",
    "r": true,
    "steps": "Customer Complaining From Local Calls Dispute."
  },
  {
    "c": "19001",
    "ta": "",
    "te": "DSL Acc Mod Sales - New Lead",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Sales - New Lead.",
    "r": true,
    "steps": "DSL Acc Mod For Sales - New Lead."
  },
  {
    "c": "18005",
    "ta": "",
    "te": "DSL Acc Mod VAS - Release",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For VAS - Release.",
    "r": true,
    "steps": "DSL Acc Mod For VAS - Release."
  },
  {
    "c": "18004",
    "ta": "",
    "te": "DSL Acc Mod VAS - Suspend",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For VAS - Suspend.",
    "r": true,
    "steps": "DSL Acc Mod For VAS - Suspend."
  },
  {
    "c": "18003",
    "ta": "",
    "te": "DSL Acc Mod VAS - Remove IPs",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For VAS - Remove Ips.",
    "r": true,
    "steps": "DSL Acc Mod For VAS - Remove Ips."
  },
  {
    "c": "18002",
    "ta": "",
    "te": "DSL Acc Mod VAS - Add Extra IPs",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For VAS - Add Extra Ips.",
    "r": true,
    "steps": "DSL Acc Mod For VAS - Add Extra Ips."
  },
  {
    "c": "17201",
    "ta": "",
    "te": "DSL Acc Mod Offers - Delete",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Offers - Delete.",
    "r": true,
    "steps": "DSL Acc Mod For Offers - Delete."
  },
  {
    "c": "16807",
    "ta": "",
    "te": "DSL Acc Mod MNP - Port In",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For MNP - Port In.",
    "r": true,
    "steps": "DSL Acc Mod For MNP - Port In."
  },
  {
    "c": "16806",
    "ta": "",
    "te": "DSL Acc Mod Line Mod - Change Account Manager",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Mod - Change Account Manager.",
    "r": true,
    "steps": "DSL Acc Mod For Line Mod - Change Account Manager."
  },
  {
    "c": "16805",
    "ta": "",
    "te": "DSL Acc Mod Line Mod - Override Change Speed",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Mod - Override Change Speed.",
    "r": true,
    "steps": "DSL Acc Mod For Line Mod - Override Change Speed."
  },
  {
    "c": "16804",
    "ta": "",
    "te": "DSL Acc Mod Line Mod - Deactivation",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Mod - Deactivation.",
    "r": true,
    "steps": "DSL Acc Mod For Line Mod - Deactivation."
  },
  {
    "c": "16803",
    "ta": "",
    "te": "DSL Acc Mod Line Mod - Temp Reactivation",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Mod - Temp. Reactivation.",
    "r": true,
    "steps": "DSL Acc Mod For Line Mod - Temp. Reactivation."
  },
  {
    "c": "16802",
    "ta": "",
    "te": "DSL Acc Mod Line Mod - Activate",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Mod - Activate.",
    "r": true,
    "steps": "DSL Acc Mod For Line Mod - Activate."
  },
  {
    "c": "16801",
    "ta": "",
    "te": "DSL Acc Mod Line Mod - Suspend",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Mod - Suspend.",
    "r": true,
    "steps": "DSL Acc Mod For Line Mod - Suspend."
  },
  {
    "c": "16604",
    "ta": "",
    "te": "DSL Acc Mod Line Changes - Change Organization",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Changes - Change Organization.",
    "r": true,
    "steps": "DSL Acc Mod For Line Changes - Change Organization."
  },
  {
    "c": "16603",
    "ta": "",
    "te": "DSL Acc Mod Line Changes - Username",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Changes - Username.",
    "r": true,
    "steps": "DSL Acc Mod For Line Changes - Username."
  },
  {
    "c": "16602",
    "ta": "",
    "te": "DSL Acc Mod Line Changes - Upgrade Speed",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Changes - Upgrade Speed.",
    "r": true,
    "steps": "DSL Acc Mod For Line Changes - Upgrade Speed."
  },
  {
    "c": "16601",
    "ta": "",
    "te": "DSL Acc Mod Line Changes - Downgrade Speed",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Line Changes - Downgrade Speed.",
    "r": true,
    "steps": "DSL Acc Mod For Line Changes - Downgrade Speed."
  },
  {
    "c": "16405",
    "ta": "",
    "te": "DSL Acc Mod Hardware - Item Received",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Hardware - Item Received.",
    "r": true,
    "steps": "DSL Acc Mod For Hardware - Item Received."
  },
  {
    "c": "16403",
    "ta": "",
    "te": "DSL Acc Mod Hardware - Replace",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Hardware - Replace.",
    "r": true,
    "steps": "DSL Acc Mod For Hardware - Replace."
  },
  {
    "c": "16402",
    "ta": "",
    "te": "DSL Acc Mod Hardware - Remove",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Hardware - Remove.",
    "r": true,
    "steps": "DSL Acc Mod For Hardware - Remove."
  },
  {
    "c": "16401",
    "ta": "",
    "te": "DSL Acc Mod Hardware - Add",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Hardware - Add.",
    "r": true,
    "steps": "DSL Acc Mod For Hardware - Add."
  },
  {
    "c": "16210",
    "ta": "",
    "te": "DSL - Customer Info Update (Candidate)",
    "k": "DSL",
    "da": "Customer info update for candidate customer.",
    "r": true,
    "steps": "Customer info update for candidate customer."
  },
  {
    "c": "16202",
    "ta": "",
    "te": "DSL Acc Mod Contract Data - Modify",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Contract Data - Modify.",
    "r": true,
    "steps": "DSL Acc Mod For Contract Data - Modify."
  },
  {
    "c": "16201",
    "ta": "",
    "te": "DSL Acc Mod Contract Data - Change",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Contract Data - Change.",
    "r": true,
    "steps": "DSL Acc Mod For Contract Data - Change."
  },
  {
    "c": "16058",
    "ta": "",
    "te": "DSL - Knowing Cost Before Cancellation",
    "k": "DSL",
    "da": "Knowing the remaining cost for the customer before cancellation.",
    "r": true,
    "steps": "Knowing the remaining cost for the customer before cancellation."
  },
  {
    "c": "16020",
    "ta": "",
    "te": "DSL Acc Mod Billing - Billing Adjustment Username",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Billing Adjustment-Username.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Billing Adjustment-Username."
  },
  {
    "c": "16019",
    "ta": "",
    "te": "DSL Acc Mod Billing - Check Balance For TE Data",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Check Balance For TE Data.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Check Balance For TE Data."
  },
  {
    "c": "16018",
    "ta": "",
    "te": "DSL Acc Mod Billing - Add Visit Fees",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Add Visit Fees.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Add Visit Fees."
  },
  {
    "c": "16017",
    "ta": "",
    "te": "DSL Acc Mod Billing - Resume Dunning",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Resume Dunning.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Resume Dunning."
  },
  {
    "c": "16016",
    "ta": "",
    "te": "DSL Acc Mod Billing - Charge Penalty Fees",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Charge Penalty Fees.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Charge Penalty Fees."
  },
  {
    "c": "16015",
    "ta": "",
    "te": "DSL Acc Mod Billing - Waive Penalty Fees",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Waive Penalty Fees.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Waive Penalty Fees."
  },
  {
    "c": "16014",
    "ta": "",
    "te": "DSL Acc Mod Billing - Drop Amount",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Drop Amount.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Drop Amount."
  },
  {
    "c": "16013",
    "ta": "",
    "te": "DSL Acc Mod Billing - Waive Switching Fees",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Waive Switching Fees.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Waive Switching Fees."
  },
  {
    "c": "16012",
    "ta": "",
    "te": "DSL Acc Mod Billing - Refund Payment",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Refund Payment.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Refund Payment."
  },
  {
    "c": "16011",
    "ta": "",
    "te": "DSL Acc Mod Billing - Hold Dunning",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Hold Dunning.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Hold Dunning."
  },
  {
    "c": "16010",
    "ta": "",
    "te": "DSL Acc Mod Billing - Release Line",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Release Line.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Release Line."
  },
  {
    "c": "16009",
    "ta": "",
    "te": "DSL Acc Mod Billing - Direct Debit",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Direct Debit.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Direct Debit."
  },
  {
    "c": "16008",
    "ta": "",
    "te": "DSL Acc Mod Billing - Money Transfer",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Money Transfer.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Money Transfer."
  },
  {
    "c": "16007",
    "ta": "",
    "te": "DSL Acc Mod Billing - Send Payment Request",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Send Payment Request.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Send Payment Request."
  },
  {
    "c": "16006",
    "ta": "",
    "te": "DSL Acc Mod Billing - Send Tax Card",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Send Tax Card.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Send Tax Card."
  },
  {
    "c": "16005",
    "ta": "",
    "te": "DSL Acc Mod Billing - Send Itemized Bill",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Send Itemized Bill.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Send Itemized Bill."
  },
  {
    "c": "16004",
    "ta": "",
    "te": "DSL Acc Mod Billing - Credit Card Issues",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Credit Card Issues.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Credit Card Issues."
  },
  {
    "c": "16003",
    "ta": "",
    "te": "DSL Acc Mod Billing - Collect Bill",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Collect Bill.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Collect Bill."
  },
  {
    "c": "16002",
    "ta": "",
    "te": "DSL Acc Mod Billing - Collect Down Payment",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Collect Down Payment.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Collect Down Payment."
  },
  {
    "c": "16001",
    "ta": "",
    "te": "DSL Acc Mod Billing - Review Balance Cancelation",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For Billing - Review Balance- Cancelation.",
    "r": true,
    "steps": "DSL Acc Mod For Billing - Review Balance- Cancelation."
  },
  {
    "c": "14004",
    "ta": "",
    "te": "DSL Acc Mod New Line - Activate Static 16 IPs",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For New Line - Activate Static 16 IPs.",
    "r": true,
    "steps": "DSL Acc Mod For New Line - Activate Static 16 IPs."
  },
  {
    "c": "14003",
    "ta": "",
    "te": "DSL Acc Mod New Line - Activate Static 8 IPs",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For New Line - Activate Static 8 IPs.",
    "r": true,
    "steps": "DSL Acc Mod For New Line - Activate Static 8 IPs."
  },
  {
    "c": "14002",
    "ta": "",
    "te": "DSL Acc Mod New Line - Manual Activation",
    "k": "DSL Acc Mod",
    "da": "DSL Acc Mod For New Line - Manual Activation.",
    "r": true,
    "steps": "DSL Acc Mod For New Line - Manual Activation."
  },
  {
    "c": "12304",
    "ta": "",
    "te": "Acc Mod Products",
    "k": "Acc Mod",
    "da": "Acc Mod For Products.",
    "r": true,
    "steps": "Acc Mod For Products."
  },
  {
    "c": "12246",
    "ta": "",
    "te": "Acc Mod Special Program - Corporate Pts Transfer",
    "k": "Acc Mod",
    "da": "For Points transfer Corp use.",
    "r": true,
    "steps": "For Points transfer Corp use."
  },
  {
    "c": "12201",
    "ta": "",
    "te": "Acc Mod Special Program - CS Pts Transfer Same Owner",
    "k": "Acc Mod",
    "da": "For transfer points same owner Personal.",
    "r": true,
    "steps": "For transfer points same owner Personal."
  },
  {
    "c": "12123",
    "ta": "",
    "te": "Acc Mod MNP - Upselling Port In",
    "k": "Acc Mod",
    "da": "Prospect use for MNP port in request with an offer.",
    "r": true,
    "steps": "Prospect use for MNP port in request with an offer."
  },
  {
    "c": "12106",
    "ta": "",
    "te": "Acc Mod MNP - Port In",
    "k": "Acc Mod",
    "da": "Prospect use for MNP port in request.",
    "r": true,
    "steps": "Prospect use for MNP port in request."
  },
  {
    "c": "11527",
    "ta": "",
    "te": "Activation - Integrated Services Card Discount (تفعيل - خصم بطاقة الخدمات المتكاملة)",
    "k": "Activation",
    "da": "Discount with the Integrated Services Card.",
    "r": true,
    "steps": "Discount with the Integrated Services Card."
  },
  {
    "c": "11517",
    "ta": "",
    "te": "Complaint Handling - Fault for Credit",
    "k": "Complaint Handling",
    "da": "Fault for credit.",
    "r": true,
    "steps": "Fault for credit."
  },
  {
    "c": "11221",
    "ta": "",
    "te": "Orange Cash - Fund Transfer",
    "k": "Orange Cash",
    "da": "Transferring funds from one wallet to another.",
    "r": true,
    "steps": "Transferring funds from one wallet to another."
  },
  {
    "c": "11189",
    "ta": "",
    "te": "Orange Cash - Update Account",
    "k": "Orange Cash",
    "da": "Orange Cash account update when the customer's wallet is suspended.",
    "r": true,
    "steps": "Orange Cash account update when the customer's wallet is suspended."
  },
  {
    "c": "11132",
    "ta": "",
    "te": "Acc Mod VAS - Suspend",
    "k": "Acc Mod",
    "da": "Acc Mod For VAS - Suspend.",
    "r": true,
    "steps": "Acc Mod For VAS - Suspend."
  },
  {
    "c": "11129",
    "ta": "",
    "te": "Acc Mod VAS - Release",
    "k": "Acc Mod",
    "da": "Acc Mod For VAS - Release.",
    "r": true,
    "steps": "Acc Mod For VAS - Release."
  },
  {
    "c": "11128",
    "ta": "",
    "te": "Acc Mod VAS - Modify",
    "k": "Acc Mod",
    "da": "Acc Mod For VAS - Modify.",
    "r": true,
    "steps": "Acc Mod For VAS - Modify."
  },
  {
    "c": "11119",
    "ta": "",
    "te": "Acc Mod VAS - Delete Services",
    "k": "Acc Mod",
    "da": "For deleting services as Roaming, international, Direct debit.",
    "r": true,
    "steps": "For deleting services as Roaming, international, Direct debit."
  },
  {
    "c": "11102",
    "ta": "",
    "te": "Acc Mod VAS - Add Services",
    "k": "Acc Mod",
    "da": "For adding services as Roaming, international, Direct Debit.",
    "r": true,
    "steps": "For adding services as Roaming, international, Direct Debit."
  },
  {
    "c": "10901",
    "ta": "",
    "te": "Acc Mod Offers - Add",
    "k": "Acc Mod",
    "da": "Acc Mod For Offers - Add.",
    "r": true,
    "steps": "Acc Mod For Offers - Add."
  },
  {
    "c": "10841",
    "ta": "",
    "te": "Reallocation",
    "k": "Acc Mod",
    "da": "If a reallocation request is approved, we create an SR and upload all the documents.",
    "r": true,
    "steps": "If a reallocation request is approved, we create an SR and upload all the documents."
  },
  {
    "c": "10831",
    "ta": "",
    "te": "Hybrid Violation - Amend Contracts",
    "k": "Acc Mod",
    "da": "Amend line contracts and documents.",
    "r": true,
    "steps": "Amend line contracts and documents."
  },
  {
    "c": "10811",
    "ta": "",
    "te": "Activation Foreigner - New Line",
    "k": "Activation",
    "da": "New line activation SR for Foreigners.",
    "r": true,
    "steps": "New line activation SR for Foreigners."
  },
  {
    "c": "10801",
    "ta": "",
    "te": "Activation Egyptian - New Line",
    "k": "Activation",
    "da": "New Line activation SR For Egyptians.",
    "r": true,
    "steps": "New Line activation SR For Egyptians."
  },
  {
    "c": "10765",
    "ta": "",
    "te": "Migration - Pre/Hybrid To Premier New ADSL",
    "k": "MIG",
    "da": "When Migrating from pre or hybrid to premier with new ADSL.",
    "r": true,
    "steps": "When Migrating from pre or hybrid to premier with new ADSL."
  },
  {
    "c": "10764",
    "ta": "",
    "te": "Migration - From Premier To Pre/Post",
    "k": "MIG",
    "da": "When migrating from premier to Pre or post.",
    "r": true,
    "steps": "When migrating from premier to Pre or post."
  },
  {
    "c": "10763",
    "ta": "",
    "te": "Migration - To Premier Exist ADSL",
    "k": "MIG",
    "da": "For migration to Premier with Existing ADSL.",
    "r": true,
    "steps": "For migration to Premier with Existing ADSL."
  },
  {
    "c": "10762",
    "ta": "",
    "te": "Migration - To Premier New ADSL",
    "k": "MIG",
    "da": "For migration to premier with NEW ADSL.",
    "r": true,
    "steps": "For migration to premier with NEW ADSL."
  },
  {
    "c": "10761",
    "ta": "",
    "te": "Migration - From Pre/Hybrid Exist ADSL",
    "k": "MIG",
    "da": "For migration from pre or Hybrid to Premier with Existing ADSL.",
    "r": true,
    "steps": "For migration from pre or Hybrid to Premier with Existing ADSL."
  },
  {
    "c": "10760",
    "ta": "",
    "te": "Migration - From Control Share Portfolio",
    "k": "MIG",
    "da": "When Migrating from control share to postpaid.",
    "r": true,
    "steps": "When Migrating from control share to postpaid."
  },
  {
    "c": "10756",
    "ta": "",
    "te": "Migration - From Eagle 100",
    "k": "MIG",
    "da": "When Migrating from eagle to Pre or Postpaid.",
    "r": true,
    "steps": "When Migrating from eagle to Pre or Postpaid."
  },
  {
    "c": "10751",
    "ta": "",
    "te": "Migration - From Star Limit",
    "k": "MIG",
    "da": "When migrating from star limit to pre or postpaid.",
    "r": true,
    "steps": "When migrating from star limit to pre or postpaid."
  },
  {
    "c": "10744",
    "ta": "",
    "te": "Migration - To Premier With Home 4G",
    "k": "MIG",
    "da": "For migration to Premier with Home 4G.",
    "r": true,
    "steps": "For migration to Premier with Home 4G."
  },
  {
    "c": "10740",
    "ta": "",
    "te": "Migration - From Corp With Credit Approval",
    "k": "MIG",
    "da": "When migrating from corp to Personal with credit approval (SR on main account).",
    "r": true,
    "steps": "When migrating from corp to Personal with credit approval (SR on main account)."
  },
  {
    "c": "10731",
    "ta": "",
    "te": "Migration - From Control Free",
    "k": "MIG",
    "da": "When migration from control free to Postpaid.",
    "r": true,
    "steps": "When migration from control free to Postpaid."
  },
  {
    "c": "10726",
    "ta": "",
    "te": "Migration - From Control To Postpaid",
    "k": "MIG",
    "da": "When migrating From control to Postpaid.",
    "r": true,
    "steps": "When migrating From control to Postpaid."
  },
  {
    "c": "10722",
    "ta": "",
    "te": "Migration - From Star Control",
    "k": "MIG",
    "da": "When migrating from star control to pre or postpaid.",
    "r": true,
    "steps": "When migrating from star control to pre or postpaid."
  },
  {
    "c": "10713",
    "ta": "",
    "te": "Migration - From Postpaid Data",
    "k": "MIG",
    "da": "Acc Mod For Migration - From Postpaid Data To.",
    "r": true,
    "steps": "Acc Mod For Migration - From Postpaid Data To."
  },
  {
    "c": "10709",
    "ta": "",
    "te": "Migration - From Corp Call And Control",
    "k": "MIG",
    "da": "When migrating from corp call and control to Post or Pre (SR on main account).",
    "r": true,
    "steps": "When migrating from corp call and control to Post or Pre (SR on main account)."
  },
  {
    "c": "10708",
    "ta": "",
    "te": "Migration - From Corp Standard",
    "k": "MIG",
    "da": "When migrating from Corp postpaid to Pre or Postpaid (SR on main account).",
    "r": true,
    "steps": "When migrating from Corp postpaid to Pre or Postpaid (SR on main account)."
  },
  {
    "c": "10707",
    "ta": "",
    "te": "Migration - From Call And Control",
    "k": "MIG",
    "da": "When Migrating from Call and control to Premier.",
    "r": true,
    "steps": "When Migrating from Call and control to Premier."
  },
  {
    "c": "10706",
    "ta": "",
    "te": "Migration - From Star",
    "k": "MIG",
    "da": "When migrating from Star to premier.",
    "r": true,
    "steps": "When migrating from Star to premier."
  },
  {
    "c": "10705",
    "ta": "",
    "te": "Migration - From Primo",
    "k": "MIG",
    "da": "When migrating from Primo to Premier.",
    "r": true,
    "steps": "When migrating from Primo to Premier."
  },
  {
    "c": "10704",
    "ta": "",
    "te": "Migration - From Al Kart (Pre to Post)",
    "k": "MIG",
    "da": "When customer wants to migrate his pre to postpaid tariff.",
    "r": true,
    "steps": "When customer wants to migrate his pre to postpaid tariff."
  },
  {
    "c": "10693",
    "ta": "",
    "te": "Activation - Update Line Info For Foreigners",
    "k": "Activation",
    "da": "Updating line information for foreigners.",
    "r": true,
    "steps": "Updating line information for foreigners."
  },
  {
    "c": "10692",
    "ta": "",
    "te": "Data Update - Egyptians And Foreigners",
    "k": "Activation",
    "da": "Data Update for Egyptians and Foreigners.",
    "r": true,
    "steps": "Data Update for Egyptians and Foreigners."
  },
  {
    "c": "10675",
    "ta": "",
    "te": "Acc Mod Line Modification - DG National ID",
    "k": "Acc Mod",
    "da": "Data gathering for Egyptians with national ID.",
    "r": true,
    "steps": "Data gathering for Egyptians with national ID."
  },
  {
    "c": "10674",
    "ta": "",
    "te": "Acc Mod Line Modification - DG Foreigner Passport",
    "k": "Acc Mod",
    "da": "For data gathering Foreigners with passport.",
    "r": true,
    "steps": "For data gathering Foreigners with passport."
  },
  {
    "c": "10662",
    "ta": "",
    "te": "Acc Mod Line Modification - Blocking SMS ADs",
    "k": "Acc Mod",
    "da": "For Blocking SMS ads for customer when complaining from sms ads.",
    "r": true,
    "steps": "For Blocking SMS ads for customer when complaining from sms ads."
  },
  {
    "c": "10650",
    "ta": "",
    "te": "Acc Mod Line Modification - Ownership Data Registration",
    "k": "Acc Mod",
    "da": "For ownership data Registration.",
    "r": true,
    "steps": "For ownership data Registration."
  },
  {
    "c": "10621",
    "ta": "",
    "te": "Acc Mod Line Modification - Line Suspend",
    "k": "Acc Mod",
    "da": "Acc Mod For Line Modification - Line suspend.",
    "r": true,
    "steps": "Acc Mod For Line Modification - Line suspend."
  },
  {
    "c": "10607",
    "ta": "",
    "te": "Acc Mod Line Modification - Change Of Ownership",
    "k": "Acc Mod",
    "da": "For change of ownership.",
    "r": true,
    "steps": "For change of ownership."
  },
  {
    "c": "10604",
    "ta": "",
    "te": "Acc Mod Line Modification - Change",
    "k": "Acc Mod",
    "da": "Acc Mod For Line Modification - Change.",
    "r": true,
    "steps": "Acc Mod For Line Modification - Change."
  },
  {
    "c": "10512",
    "ta": "",
    "te": "Acc Mod Group Share - Activate & Change Initiator",
    "k": "Acc Mod",
    "da": "When adding Home 4g to group share and to add premier discount.",
    "r": true,
    "steps": "When adding Home 4g to group share and to add premier discount."
  },
  {
    "c": "10511",
    "ta": "",
    "te": "Acc Mod Group Share - Individualize Same Customer",
    "k": "Acc Mod",
    "da": "When customer wants to individualize dial same owner.",
    "r": true,
    "steps": "When customer wants to individualize dial same owner."
  },
  {
    "c": "10504",
    "ta": "",
    "te": "Acc Mod Group Share - Individual Diff Customer",
    "k": "Acc Mod",
    "da": "When customer wants to individualize dial different owner.",
    "r": true,
    "steps": "When customer wants to individualize dial different owner."
  },
  {
    "c": "10502",
    "ta": "",
    "te": "Acc Mod Group Share - Grouping",
    "k": "Acc Mod",
    "da": "When customer wants to make grouping to dial with same owner.",
    "r": true,
    "steps": "When customer wants to make grouping to dial with same owner."
  },
  {
    "c": "10501",
    "ta": "",
    "te": "Acc Mod Group Share - Activate",
    "k": "Acc Mod",
    "da": "When customer wants to activate new dial as a group share to his account.",
    "r": true,
    "steps": "When customer wants to activate new dial as a group share to his account."
  },
  {
    "c": "10302",
    "ta": "",
    "te": "Acc Mod Data Services - Delete",
    "k": "Acc Mod",
    "da": "Acc Mod For Data Services - Delete.",
    "r": true,
    "steps": "Acc Mod For Data Services - Delete."
  },
  {
    "c": "10301",
    "ta": "",
    "te": "Acc Mod Data Services - Add",
    "k": "Acc Mod",
    "da": "Acc Mod For Data Services - Add.",
    "r": true,
    "steps": "Acc Mod For Data Services - Add."
  },
  {
    "c": "10224",
    "ta": "",
    "te": "Acc Mod Changing Tariff - From Star Control",
    "k": "Acc Mod",
    "da": "When customer wants to change tariff from star control to any postpaid tariff.",
    "r": true,
    "steps": "When customer wants to change tariff from star control to any postpaid tariff."
  },
  {
    "c": "10216",
    "ta": "",
    "te": "Acc Mod Changing Tariff - From Star Etkalem",
    "k": "Acc Mod",
    "da": "When customer wants to change from star etklm to any postpaid tariff.",
    "r": true,
    "steps": "When customer wants to change from star etklm to any postpaid tariff."
  },
  {
    "c": "10213",
    "ta": "",
    "te": "Acc Mod Changing Tariff - Change Tariff (Post to Post)",
    "k": "Acc Mod",
    "da": "When customer wants to change tariff from postpaid to postpaid tariff.",
    "r": true,
    "steps": "When customer wants to change tariff from postpaid to postpaid tariff."
  },
  {
    "c": "10203",
    "ta": "",
    "te": "Acc Mod Changing Tariff - From Smart Phone",
    "k": "Acc Mod",
    "da": "When customer wants to change tariff from star smart phone to any post paid tariff.",
    "r": true,
    "steps": "When customer wants to change tariff from star smart phone to any post paid tariff."
  },
  {
    "c": "10201",
    "ta": "",
    "te": "Acc Mod Changing Tariff - Change To",
    "k": "Acc Mod",
    "da": "Acc Mod For Changing Tariff - Change To.",
    "r": true,
    "steps": "Acc Mod For Changing Tariff - Change To."
  },
  {
    "c": "10183",
    "ta": "",
    "te": "Acc Mod Billing - Reallocate Easy Line",
    "k": "Acc Mod",
    "da": "When reallocating easy dial.",
    "r": true,
    "steps": "When reallocating easy dial."
  },
  {
    "c": "10145",
    "ta": "",
    "te": "Acc Mod Billing - Print Itemized Bill",
    "k": "Acc Mod",
    "da": "Acc Mod For Billing - Print Itemized Bill.",
    "r": true,
    "steps": "Acc Mod For Billing - Print Itemized Bill."
  },
  {
    "c": "10139",
    "ta": "",
    "te": "Acc Mod Billing - Release Soft Disconnection",
    "k": "Acc Mod",
    "da": "Acc Mod For Billing - Release Soft Disconnection.",
    "r": true,
    "steps": "Acc Mod For Billing - Release Soft Disconnection."
  },
  {
    "c": "10124",
    "ta": "",
    "te": "Acc Mod Billing - Reinstate Line",
    "k": "Acc Mod",
    "da": "When we Reinstate dial for the customer on his deactive dial on Siebel.",
    "r": true,
    "steps": "When we Reinstate dial for the customer on his deactive dial on Siebel."
  },
  {
    "c": "10113",
    "ta": "",
    "te": "Acc Mod Billing - Payment Plan Agreement",
    "k": "Acc Mod",
    "da": "When customer wants promise from credit team.",
    "r": true,
    "steps": "When customer wants promise from credit team."
  },
  {
    "c": "5011",
    "ta": "",
    "te": "DSL - Activation and Contract (New Subscription)",
    "k": "DSL",
    "da": "Activation and Contract for activating the new subscription.",
    "r": true,
    "steps": "Activation and Contract for activating the new subscription."
  },
  {
    "c": "5010",
    "ta": "",
    "te": "DSL - Activation and Contract (New Subscription)",
    "k": "DSL",
    "da": "Activation and Contract for activating the new subscription.",
    "r": true,
    "steps": "Activation and Contract for activating the new subscription."
  },
  {
    "c": "4108",
    "ta": "",
    "te": "Fault VAS - Orange Cash IVR 7115 Issue",
    "k": "Fault",
    "da": "Customer is complaining s/he couldn't be able to access IVR 7115 due to technical issue. Call center/retail agent to make sure that the customer is already subscribed and have an active wallet.",
    "r": true,
    "steps": "Customer is complaining s/he couldn't be able to access IVR 7115 due to technical issue. Call center/retail agent to make sure that the customer is already subscribed and have an active wallet."
  },
  {
    "c": "4107",
    "ta": "",
    "te": "Fault Orange App - Orange Cash Service Problem",
    "k": "Fault",
    "da": "Customer is complaining that s/he couldn't use one of service options. Call center/retail agent to make sure that the customer is already using the latest version and using Orange 4G network.",
    "r": true,
    "steps": "Customer is complaining that s/he couldn't use one of service options. Call center/retail agent to make sure that the customer is already using the latest version and using Orange 4G network."
  },
  {
    "c": "1114",
    "ta": "",
    "te": "Blacklist - Check Blacklist",
    "k": "Acc Mod",
    "da": "Check Blacklist.",
    "r": true,
    "steps": "Check Blacklist."
  },
  {
    "c": "1112",
    "ta": "",
    "te": "Request For Information - Orange Applications",
    "k": "Request For Information",
    "da": "For upselling My orange app.",
    "r": true,
    "steps": "For upselling My orange app."
  },
  {
    "c": "1106",
    "ta": "",
    "te": "Request For Information - Line Status Reallocation",
    "k": "Request For Information",
    "da": "For sending Reallocation request for non-Easy dials.",
    "r": true,
    "steps": "For sending Reallocation request for non-Easy dials."
  },
  {
    "c": "1030",
    "ta": "",
    "te": "Reallocation Request",
    "k": "Acc Mod",
    "da": "We submit the reallocation request, then contact the activation team to check whether the line will be returned to the customer.",
    "r": true,
    "steps": "We submit the reallocation request, then contact the activation team to check whether the line will be returned to the customer."
  },
  {
    "c": "15",
    "ta": "",
    "te": "Application Issue - Wincash Stamping",
    "k": "Fault",
    "da": "In case of Wincash stamping issue.",
    "r": true,
    "steps": "In case of Wincash stamping issue."
  },
  {
    "c": "1",
    "ta": "",
    "te": "Fault VAS - Orange Money Cash In",
    "k": "Fault",
    "da": "Fault For VAS - Orange Money Cash In.",
    "r": true,
    "steps": "Fault For VAS - Orange Money Cash In."
  }
];
if (typeof globalThis !== "undefined") globalThis.SR_DATA = SR_DATA;
export default SR_DATA;
