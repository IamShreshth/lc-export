# lc-export

Saves all your LeetCode submissions as a CSV and source code ZIP dataset.

## Option A: Google Chrome Extension (Easiest - 1 Click)

1. Open Chrome and go to `chrome://extensions/`.
2. Turn on **Developer mode** (top-right).
3. Click **Load unpacked** (top-left) and select the `extension/` folder in this repository.
4. Open the extension, choose your mode (Only Accepted or All), and click **Export to ZIP**.

---

## Option B: Python Script (CLI)

### 1. Clone & enter folder:
```bash
git clone https://github.com/IamShreshth/lc-export.git
cd lc-export
```

### 2. Install requirements:
```bash
pip3 install -r requirements.txt
```
*(If you get `command not found: pip` on Mac, run `python3 -m pip install -r requirements.txt` instead)*

### 3. Run the script:
```bash
python3 run.py
```
- Paste your `LEETCODE_SESSION` cookie when prompted (`csrftoken` is optional).
- Select your mode (Only Accepted or All).
- It will download your submissions and save `LeetCode_Submissions.csv` to your Desktop.

---

## Getting the Cookie (For Option B)
1. Log in to [leetcode.com](https://leetcode.com).
2. Press F12 (Inspect) -> Go to **Application** (or Storage) -> **Cookies**.
3. Copy the value of `LEETCODE_SESSION`.
