# LogiInsight-360-ITI-graduation


LogiInsight-360-ITI-Graduation-Project
LogiInsight 360: Agentic AI & Enterprise BI Smart ERP
🚀 Project Overview
LogiInsight 360 is a next-generation Smart Supply Chain and ERP platform designed for modern manufacturing and distribution enterprises. Traditional ERP platforms operate in isolated departmental modules (silos), resulting in a massive visibility gap between the factory floor and executive management. This system eliminates that gap by combining a robust Microsoft BI Stack (SSIS, SSRS, Power BI) with Microsoft Power Platform and an autonomous Agentic AI Engine (GPT-4o) hosted on Azure SQL Serverless.

💼 The Targeted Business Cycle
The platform manages the end-to-end operational lifecycle: Vendor Sourcing & Procurement ➔ Production Lines ➔ Warehouse Operations ➔ Quality Control ➔ Logistics & Fleet Distribution ➔ End-Customer Delivery ➔ Reverse Logistics (Returns).

⚠️ Core Problem Statements Solved
Isolated ERP Silos & Communication Lag: Traditional ERP departments operate independently. Quality issues, raw material shortfalls, and logistical delays take days or weeks of paper-based approvals to resolve, causing compounding operational delays.
The Execution-to-Desk Visibility Gap: Decision-makers are completely disconnected from live floor-level incidents. Minor visual defects in goods or sudden transit spikes are not visible until end-of-month reporting.
Unexploited Supply Chain Data: Millions of data rows are captured daily but never correlated. Systems treat symptoms (e.g., high customer returns) rather than isolating root causes (e.g., specific vendor material failures or machine miscalibrations).
Bureaucratic Waste & Perishable Goods Degradation: When a product batch fails inspection due to purely cosmetic/visual damage (while remaining 100% safe), slow manual approvals delay rerouting. Perishable products expire in storage, resulting in a 100% financial write-off.
🏛️ Technical Architecture Pillars
1. Hybrid Data Architecture (OLTP / DWH)
Built on Azure SQL Database using SQL Server Management Studio (SSMS).
OLTP (Logi_ERP_OLTP): Highly optimized, normalized schema handling lightning-fast manual inputs and automated updates.
Data Warehouse (Logi_ERP_DWH): Structured as a clean dimensional model (Star Schema) optimized for analytical queries, cutting data latency down to zero.
2. Enterprise BI & Extraction Pipeline (SSIS / SSRS / Power BI)
ETL via SSIS: Automated Integration Services packages extract raw operational logs from OLTP tables, transform them to conform to dimensional structures, and load them into the DWH periodically.
Operational Reporting via SSRS: Scheduled SQL Server Reporting Services generate rigid enterprise balance sheets and logistical logs for compliance and financial auditing.
Analytical Insights via Power BI: Dynamic dashboards display complex historical performance, supplier evaluation matrices, and consumption velocity.
3. Field Low-Code Layer & Orchestration (Power Apps & Power Automate)
Power Apps: Serves as a digital field data collection interface for Quality Inspectors, Fleet Drivers, and Warehouse Managers.
Power Automate: Acts as the centralized orchestration engine. It triggers automated conditional logic cross-departmentally whenever data thresholds change in Azure SQL.
4. Agentic AI Decision Engine (OpenAI GPT-4o Integration)
Fully automated pipelines eliminate human latency. The system switches from a passive tracker to an active autonomous agent capable of reasoning through complex textual text input and inserting actionable solutions directly into the ERP.
🧠 Smart Operational Workflows
🔄 Scenario : The Smart Defective & Waste Recovery Loop
Field Entry: A Quality Inspector logs a batch failure via Power Apps due to cosmetic reasons ("Dented outer packaging, product seals are 100% airtight and chemically safe").
AI Action: Power Automate detects the failure, bypasses manual approvals, and pushes the text to OpenAI GPT-4o. The AI evaluates the defect vs. shelf-life safety, and calculates an autonomous commercial mitigation strategy: "Reroute immediately to Factory Outlet Warehouse at a 30% discount to avoid expiration."
Resolution: The strategy is injected into [AI].[AI_Recommendations]. The Warehouse Manager receives a push notification on their mobile screen and clicks Approve, instantly triggering an underlying Azure SQL Stored Procedure that moves inventory records from the Main Warehouse to the Outlet. Value Recovered: 70% instead of a 100% loss.
🛠️ Tech Stack & Keywords
Cloud Infrastructure: Azure SQL Database (Serverless), SSMS
Data Engineering & BI: Microsoft SQL Server Integration Services (SSIS), SQL Server Reporting Services (SSRS), Power BI Desktop
Low-Code/No-Code Platform: Microsoft Power Apps (Canvas Apps), Microsoft Power Automate
Artificial Intelligence: OpenAI API, GPT-4o Model, Agentic Workflow Design, Predictive Analytics
