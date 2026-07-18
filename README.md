# 🚀 lc-export

**lc-export** is a fast, automated utility to back up all your LeetCode submissions as a local dataset. Whether you want to review your solutions offline, track your grind, or feed your coding history into AI models like Claude or ChatGPT, this tool has you covered.

It extracts:
- Submissions metadata (ID, title, status, runtime, memory, language, date) into a structured `.csv` file.
- Your personal code files (ignoring LeetCode's copyrighted problem statements to keep your repository safe).

You can run this project in **two ways**:

---

## ⚡ Option A: Google Chrome Extension (Easiest - 1 Click)

Perfect if you want a visual interface and don't want to copy-paste session cookies.

### Setup Instructions:
1. Open Google Chrome and go to `chrome://extensions/`.
2. Turn on **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** (top-left) and select the `extension/` folder in this repository.
4. Click the extension icon in your toolbar.
5. Choose your mode:
   - **Only Accepted Submissions** (ignores compile errors and failed runs).
   - **All Submissions** (downloads all attempts).
6. Click **Export to ZIP** and watch the real-time progress bar. A `.zip` archive containing your organized code files and the CSV will download directly.

---

## 🐍 Option B: Python CLI (Terminal)

Perfect for developers who want a CLI script or local execution.

### 1. Clone & Enter Folder:
```bash
git clone https://github.com/IamShreshth/lc-export.git
cd lc-export
```

### 2. Install Requirements:
```bash
pip3 install -r requirements.txt
```
> [!TIP]
> If you get `zsh: command not found: pip` on macOS, run:
> `python3 -m pip install -r requirements.txt` or `pip3 install -r requirements.txt`

### 3. Run the Launcher:
```bash
python3 run.py
```
- Paste your `LEETCODE_SESSION` cookie when prompted (`csrftoken` is optional).
- Select your mode (Only Accepted or All).
- The script downloads your submissions to a temporary folder, compiles the CSV, and saves `LeetCode_Submissions.csv` to your Desktop.

---

## 🍪 How to Get Your Cookie (For Option B)
1. Log in to [leetcode.com](https://leetcode.com) in your browser.
2. Open Developer Tools (Right-click -> **Inspect**, or press `F12` / `Cmd + Option + I`).
3. Go to the **Application** tab (or **Storage** in Firefox) and select **Cookies** in the left sidebar.
4. Click on `https://leetcode.com` and find `LEETCODE_SESSION`.
5. Copy its value.

---

## ⚠️ Disclaimer
> [!WARNING]
> Do not upload downloaded LeetCode problem descriptions to GitHub or any public website, as they are the intellectual property of LeetCode LLC. This tool is built for personal archive purposes and intentionally drops problem statements by default.
