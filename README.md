# lc-export

Saves all your LeetCode submissions as a CSV dataset. 

## Quick Start

1. Clone & enter folder:
```bash
git clone https://github.com/IamShreshth/lc-export.git
cd lc-export
```

2. Install requirements:
```bash
pip3 install -r requirements.txt
```
*(If you get `command not found: pip` on Mac, run `python3 -m pip install -r requirements.txt` instead)*

3. Run the script:
```bash
python3 run.py
```

## How it works

- Prompts you for your `LEETCODE_SESSION` cookie.
- Downloads your submissions and compiles them into `LeetCode_Submissions.csv` on your Desktop.
- Ignores problem statements to prevent DMCA/copyright issues.

## Getting the Cookie
1. Log in to [leetcode.com](https://leetcode.com).
2. Press F12 (Inspect) -> Go to **Application** (or Storage) -> **Cookies**.
3. Copy the value of `LEETCODE_SESSION`.
