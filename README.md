<div align="center">
  <img src="extension/icon.png" width="128" height="128" alt="LC Export Logo">
  <h1>lc-export</h1>
  <p>Export your entire LeetCode history into a clean CSV and code archive.</p>
  <br>
  <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FIamShreshth%2Flc-export&countColor=%23ffa116&style=flat" alt="Views">
</div>

---

I built **lc-export** to solve a specific problem: LeetCode doesn't let you easily export your own data to see your progress or analyze your weak spots. 

If you want to dump your submission history into Claude or ChatGPT to get insights on your coding patterns, you need a CSV index of your submissions. This tool grabs all of that data and bundles it alongside your actual code files.

You can use it in two ways:

## 1. Chrome Extension (Recommended)
The easiest way. It uses your active browser session so you don't have to deal with auth tokens, and it zips everything up completely locally in your browser.

**How to install:**
1. Open Google Chrome and go to `chrome://extensions/`.
2. Toggle **Developer mode** on (top-right corner).
3. Click **Load unpacked** and select the `extension/` folder from this repo.
4. Click the new extension icon in your toolbar, pick your mode (All vs Accepted), and hit **Export**. 

## 2. Python CLI
If you prefer the terminal, there is a Python script that hits LeetCode's REST and GraphQL APIs to download your data.

**How to run:**
```bash
git clone https://github.com/IamShreshth/lc-export.git
cd lc-export
pip3 install -r requirements.txt
python3 run.py
```
*Note: The CLI will prompt you for your `LEETCODE_SESSION` cookie. You can find this in your browser's Developer Tools -> Application -> Cookies.*

---

## ⚠️ Disclaimer
> [!WARNING]
> Do not upload downloaded LeetCode problem descriptions to public repositories. They are the intellectual property of LeetCode LLC. This tool is built for personal archive and AI-analysis purposes.
