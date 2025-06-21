🛡️ AWS Admin Panel for Jira (Forge App)
A custom-built Atlassian Forge app that embeds an AWS Admin Window directly into Jira as a project page. This application is designed to help Jira administrators manage AWS user accounts efficiently — supporting full Create, Read, Update, and Delete (CRUD) operations — all within the Jira interface.

Built using React with Forge Custom UI, this tool mirrors the secure and auditable workflows commonly seen in AWS services. At the end of every operation, users are required to enter a "Change Item Name" to confirm the action, ensuring accountability and reducing the risk of accidental changes.

✨ Key Features
✅ Add New Users – Create new AWS user records directly from the panel.

✏️ Edit User Details – Modify user attributes like access type, role, or permissions.

♻️ Update Information – Keep AWS user data in sync with your organization’s policies.

❌ Secure Confirmation Step – Every action (add/edit/update) requires input of a specific “Change Item Name” as a safeguard — just like AWS Console confirmations.

📁 Project-Scoped Integration – Appears in the Jira project sidebar for seamless access.

☁️ Forge Storage Backend – Utilizes Atlassian's Forge Storage API to persist data securely.

🎨 React + Forge Custom UI Kit – Provides a polished, responsive, and intuitive interface.

🧰 Tech Stack
Frontend: React (Custom UI powered by Forge)

Backend: Atlassian Forge Functions

Storage: Forge Storage API (Forge Database)

Platform: Jira Cloud (Atlassian)

🔒 Security Workflow Inspired by AWS
To enhance safety and user accountability, each critical operation (like adding or modifying user details) is gated behind a typed confirmation step, requiring the administrator to input the corresponding "Change Item Name". This pattern is inspired by AWS's own approach to confirming impactful operations and reduces the risk of accidental changes.

📌 Use Case
Ideal for DevOps, CloudOps, or SecOps teams managing AWS user access policies or metadata — directly from Jira, without switching platforms.
