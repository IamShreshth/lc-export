# 🚀 LC Export

**LC Export** is a sleek, fast, and simple Python automation tool I built to effortlessly extract all your LeetCode submissions into a clean CSV dataset. Whether you want to analyze your progress, showcase your grind, or share your data with AI tools like Claude, LC Export has you covered.

## ✨ Features
- **One-Click Export**: Converts all your accepted submissions into a beautifully structured `.csv` file.
- **Privacy First**: Drops LeetCode's proprietary problem statements by default, saving only your personal code.
- **Auto Cleanup**: Handles all the messy temporary files behind the scenes.

## 🛠 Prerequisites
- Python 3

## 🚀 Setup & Installation
Clone this repository and install the dependencies:
```bash
git clone https://github.com/IamShreshth/lc-export.git
cd lc-export
pip3 install -r requirements.txt
```
> [!TIP]
> If you get `zsh: command not found: pip` on macOS, run:
> `python3 -m pip install -r requirements.txt` or `pip3 install -r requirements.txt`

## 🍪 How to Get Your Cookies
To fetch your private submissions, the script needs your active LeetCode session cookie.
1. Log in to [LeetCode](https://leetcode.com/) in your browser.
2. Open Developer Tools (Right-click -> **Inspect** or press `F12` / `Cmd + Option + I`).
3. Navigate to the **Application** tab (or **Storage** tab in Firefox), and select **Cookies** on the left.
4. Copy the value for `LEETCODE_SESSION` (`csrftoken` is optional).

## 💻 Usage
Run the script directly from your terminal:
```bash
python3 run.py
```
1. Paste your `LEETCODE_SESSION` (and optionally `csrftoken`) when prompted.
2. Sit back while LC Export downloads your data.
3. Find your shiny new `LeetCode_Submissions.csv` file saved straight to your Desktop!

## ⚠️ Disclaimer
> [!WARNING]
> DO NOT upload downloaded LeetCode problem descriptions to GitHub or any public website, as they belong to LeetCode LLC. This tool is designed for personal data extraction and intentionally drops problem statements to help avoid DMCA issues.

---
*Built with ❤️ by Shreshth*
