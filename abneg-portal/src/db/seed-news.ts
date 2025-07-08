import 'dotenv/config'; // Load environment variables before anything else
import { db } from "./connection";
import { newsPosts } from "./schema";

// Articles from 8. News.md
const articles = [
  {
    title: "Ghana Launches National Smart Farming Program",
    content: `In a bold move to modernize its agriculture sector, Ghana has launched a $100 million National Smart Farming Initiative to boost productivity, resilience, and income for smallholder farmers. The program integrates cutting-edge digital tools including drone-assisted planting, real-time soil moisture sensors, satellite crop monitoring, AI-based pest detection, and weather forecasting apps.\n\nThe Minister of Agriculture, Hon. Kwesi Armah, stated during the launch that the program will reach over 250,000 farmers in its first year. It includes subsidies for smart irrigation systems, free farmer training modules in six languages, and mobile-based extension services to provide on-demand agronomic advice.\n\nABNEG has been invited as a key stakeholder to support grassroots training and provide mentorship for agritech entrepreneurs through its Smart Farms Accelerator. The platform will also connect participating farmers to buyers and logistics providers via the ABNEG Marketplace.\n\n“This program represents a pivotal shift for Ghana’s food systems,” said ABNEG’s President, Nana Kwaku Aboagye. “It’s an opportunity to close the digital divide and empower smallholder farmers with the tools of the future.”`,
    createdAt: new Date("2025-07-28"),
  },
  {
    title: "ABNEG Member Wins 2025 African Agripreneur Award",
    content: `ABNEG is proud to celebrate one of its founding members, Ms. Linda Abena Boateng, who has won the 2025 African Agripreneur Award presented by the African Development Bank. Her company, Green Harvest Ghana, was recognized for transforming cassava farming into a thriving export industry through the production of gluten-free, high-quality cassava flour.\n\nLinda's innovation has led to the creation of over 120 full-time jobs—70% of which are held by women—and the onboarding of 2,000 cassava outgrowers across Eastern and Central Ghana. By building solar-powered mini-processing hubs in rural communities, her company has drastically reduced post-harvest losses and improved income levels for smallholder farmers.\n\nHer award-winning initiative is not just about commerce but impact. Through her Women in Agribusiness Fellowship, Linda mentors young female entrepreneurs, shares her business model in schools and community centers, and advocates for inclusive agribusiness policies across the continent.\n\nIn her acceptance speech, she remarked, “This award is for every woman who dared to dream and till the soil, who built something from the ground up. We are changing the narrative of African agriculture—one harvest at a time.”`,
    createdAt: new Date("2025-06-15"),
  },
  {
    title: "African Diaspora Investment in AgriTech Surges",
    content: `New findings from ABNEG’s Diaspora Investment Watch show a record-setting 40% increase in AgriTech investments by Africans in the diaspora during Q1 2025. The $320 million influx has primarily gone to startups offering digital solutions for African agriculture—ranging from farm management platforms and soil analysis apps to blockchain-based traceability systems.\n\nDiaspora investors, mostly from the US, UK, and Canada, cited social impact, scalable returns, and technology transfer as the top motivators. Nigeria, Kenya, Ghana, and Ethiopia emerged as hotspots for investment-ready innovations. Notable deals include a $10M round raised by FarmFleet for its logistics-as-a-service platform and a $5M diaspora fund for youth-led agritech incubators in Ghana.\n\nTo build on this momentum, ABNEG is organizing a virtual matchmaking summit in October 2025 where diaspora investors can meet vetted startups and cooperatives seeking capital and strategic guidance.\n\n“Investment from the diaspora is not just financial—it brings networks, experience, and confidence,” said ABNEG Diaspora Director, Fatou Diallo. “We are building bridges between opportunity and heritage.”`,
    createdAt: new Date("2025-05-22"),
  },
  {
    title: "Breakthrough Biopesticide Approved for Organic Farming",
    content: `In a landmark announcement for organic agriculture, the African Centre for Crop Research (ACCR) has approved a new biopesticide, BioShield-X, developed from neem oil and chili extract. This natural solution has proven effective against key pests like aphids, armyworms, and whiteflies, while remaining harmless to pollinators and safe for food crops.\n\nBioShield-X was trialed across demonstration farms in Ghana, Togo, and Côte d'Ivoire, with results showing over 85% pest control efficiency and a 20% increase in yield among test plots compared to untreated fields. Farmers praised the product for its affordability, ease of use, and the absence of harmful chemical residues.\n\nThe product is now certified for organic farming across six West African countries, and ABNEG has secured exclusive training rights to introduce BioShield-X to its member communities through a regional awareness campaign.\n\nIn August, ABNEG will host live webinars and in-person demos to train members on proper usage, integrated pest management, and natural farming alternatives. Farmers and cooperatives are encouraged to register via the ABNEG Training Portal.\n\nDr. Sena Akoto, lead researcher at ACCR, stated, “This is a home-grown solution for Africa’s food security challenges—eco-safe, cost-effective, and scalable.”`,
    createdAt: new Date("2025-04-09"),
  },
];

// Add new articles from 9. News_2.md
articles.push(
  {
    title: "ECOWAS Approves Regional Agribusiness Trade Corridor",
    content: `In a landmark policy shift, the Economic Community of West African States (ECOWAS) has approved the creation of a Regional Agribusiness Trade Corridor to facilitate the free movement of agricultural goods, technologies, and services between member countries.\n\nThis corridor will reduce trade barriers, improve infrastructure at border posts, and harmonize phytosanitary standards for fresh produce and livestock. The plan includes the construction of 14 cross-border agribusiness parks equipped with cold storage, warehousing, quality control labs, and customs clearance hubs.\n\nABNEG is engaging national agribusiness associations to ensure that smallholders and cooperatives are included in this transformative trade framework. According to ECOWAS Trade Commissioner, Hamed Sory, *“This is about more than trade. It’s about building a regional food economy that works for everyone.”*`,
    createdAt: new Date("2025-07-04"),
  },
  {
    title: "Kenyan Youth Launch Drone Startup to Fight Post-Harvest Losses",
    content: `Three university graduates in Kenya have launched a drone startup, AgroSky, that is helping smallholder farmers reduce post-harvest losses by providing aerial surveillance, pest detection, and logistics mapping services.\n\nAgroSky drones are equipped with multispectral imaging cameras that detect early signs of fungal infection, pest infestation, and nitrogen deficiency. This data is sent to a mobile app that provides farmers with real-time actionable insights. The startup also offers a “Last Mile” mapping tool that helps cooperatives coordinate transport during harvest.\n\nWithin six months of operations, AgroSky has signed contracts with 15 farming cooperatives and received seed funding from a Dutch-Africa agritech innovation fund. ABNEG is onboarding AgroSky into its Agritech Mentorship Circle to scale their reach beyond East Africa.`,
    createdAt: new Date("2025-06-24"),
  },
  {
    title: "ABNEG Launches Market Access Accelerator for Export-Ready Products",
    content: `ABNEG has officially launched its Market Access Accelerator (MAA)—a new program designed to support agribusinesses in Africa and the diaspora to access high-value export markets. The accelerator will provide training, compliance audits, packaging redesign, digital marketing support, and direct matchmaking with foreign buyers.\n\nProgram Highlights:\n- 10-week online bootcamp focused on export standards (EU, UK, USA, UAE)\n- Access to export readiness scorecards and compliance checklists\n- Partnerships with export logistics companies and trade attachés\n- Cohorts for fresh produce, processed foods, herbal teas, spices, and shea-based cosmetics\n\nThe first cohort includes 30 agribusinesses from 12 African countries. One participant, Kwame Doku of Savanna Fruits Ghana, shared: *“Before this program, I didn’t know where to start. Now I have an export plan, a new label, and a buyer in Dubai.”*\n\nMAA will run twice per year and is free for verified ABNEG members. Applications for the November 2025 cohort will open in August.`,
    createdAt: new Date("2025-05-12"),
  },
  {
    title: "Scientists Develop Climate-Resilient Maize for Sahel Region",
    content: `A team of agricultural scientists working with the West Africa Agricultural Research Consortium (WAARC) has successfully developed a new strain of climate-resilient maize designed specifically for arid and semi-arid zones of the Sahel.\n\nDubbed “SahelMax 23”, the maize variety is drought-tolerant, matures 30% faster than conventional varieties, and demonstrates strong resistance to pests and soil salinity. The new variety was field-tested in Burkina Faso, Mali, and northern Ghana with over 7,000 farmers participating in pilot programs.\n\nAccording to Dr. Mariama Toure, lead breeder at WAARC, “SahelMax 23 is not just a new crop—it’s a new chapter in food security. This is what African science can achieve when fully funded and locally driven.”\n\nThe breakthrough comes at a critical time as climate change continues to disrupt planting seasons, reduce yields, and worsen food insecurity across the Sahel. ABNEG is coordinating a knowledge transfer series to help farmers adopt SahelMax 23 and improve resilience through regenerative soil practices and community seed banks.\n\nThe seed will be available commercially across the region by early 2026. ABNEG will prioritize distribution to women-led cooperatives and youth-run farms.`,
    createdAt: new Date("2025-04-21"),
  }
);

async function seedNews() {
  // Clear the newsPosts table to avoid duplicates and ensure only the latest articles are present
  await db.delete(newsPosts);
  // Insert articles into the newsPosts table
  await db.insert(newsPosts).values(articles);
  console.log("Seeded news posts with clean titles!");
}

seedNews().then(() => process.exit(0)).catch((err) => { console.error(err); process.exit(1); }); 