# 🚀 GitHub Deployment & Domain Setup Guide

**Goal:** Deploy your portfolio to GitHub and connect your father's company domain to showcase your work.

---

## 📋 What We'll Do

1. ✅ Upload your portfolio to GitHub
2. ✅ Enable GitHub Pages
3. ✅ Connect your custom domain
4. ✅ Your portfolio will be live at your domain!

---

## 🎯 Understanding the Setup

```
Your Domain (Father's Company)
        ↓
    Points to
        ↓
GitHub Pages (Your Portfolio)
        ↓
    Displays
        ↓
Your Portfolio Website
(Shows QuizzUp + Future Projects)
```

**Result:** Anyone visiting the domain sees YOUR portfolio, not the company website!

---

## 📂 Step 1: Prepare Your Repository Structure

### **What to Upload to GitHub:**

```
Repository Name: mohammedalsakkaf2003.github.io
(or any name you want)

Files to upload:
├── index.html                     ← Portfolio homepage
├── style.css                      ← Portfolio styles
├── script.js                      ← Portfolio scripts
├── README.md                      ← Repository description
│
├── projects/                      ← Projects showcase
│   └── quizzup/                   ← QuizzUp project page
│       ├── index.html
│       ├── screenshots/
│       └── README.md
│
└── assets/                        ← Images, icons, etc.
    ├── images/
    ├── icons/
    └── screenshots/
```

### **Which Portfolio to Use?**

You have two options:

**Option 1: Interactive Portfolio**
- Location: `Portfolio/`
- More interactive and dynamic

**Option 2: Professional Portfolio**
- Location: `Portfolio-Professional/`
- Cleaner and more professional

**Recommendation:** Use `Portfolio/` as your main site, and link to your projects!

---

## 🔧 Step 2: Create GitHub Repository

### **Method 1: Using GitHub Website**

1. **Go to GitHub:** https://github.com/mohammedalsakkaf2003
2. **Click "New Repository"** (green button)
3. **Repository Name:** 
   - Option A: `mohammedalsakkaf2003.github.io` (special name for personal site)
   - Option B: `portfolio` (any name)
4. **Description:** "Mohammed Al-Sakkaf - Software Engineering Portfolio"
5. **Public** (must be public for GitHub Pages)
6. **Don't** initialize with README (we have our own)
7. **Click "Create Repository"**

---

## 📤 Step 3: Upload Files to GitHub

### **Option A: Using GitHub Website (Easiest)**

1. **In your new repository, click "uploading an existing file"**
2. **Drag and drop your Portfolio folder contents**
3. **Commit message:** "Initial portfolio upload"
4. **Click "Commit changes"**

### **Option B: Using Git Commands (Professional)**

Open PowerShell in your `MOHAMMED-ALSAKKAF` folder and run:

```powershell
# Navigate to Portfolio folder
cd Portfolio

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio upload"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/mohammedalsakkaf2003/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 Step 4: Enable GitHub Pages

1. **Go to your repository on GitHub**
2. **Click "Settings"** (top right)
3. **Scroll down to "Pages"** (left sidebar)
4. **Under "Source":**
   - Branch: `main`
   - Folder: `/ (root)`
5. **Click "Save"**
6. **Wait 1-2 minutes**
7. **Your site is now live at:**
   - `https://mohammedalsakkaf2003.github.io/` (if you used special name)
   - `https://mohammedalsakkaf2003.github.io/portfolio/` (if you used "portfolio")

---

## 🔗 Step 5: Connect Your Custom Domain

### **What You Need:**
- Your father's company domain (e.g., `example.com` or `petrospecial.com`)
- Access to domain DNS settings

### **Steps:**

#### **A. Configure DNS (At Domain Provider)**

1. **Log in to your domain provider** (where you bought the domain)
   - GoDaddy, Namecheap, Google Domains, etc.

2. **Find DNS Settings** (might be called "DNS Management" or "Name Servers")

3. **Add these DNS records:**

**For Root Domain (example.com):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**For WWW Subdomain (www.example.com):**
```
Type: CNAME
Name: www
Value: mohammedalsakkaf2003.github.io
```

4. **Save DNS changes** (may take 24-48 hours to propagate)

#### **B. Configure GitHub Pages**

1. **Go to your repository Settings → Pages**
2. **Under "Custom domain":**
   - Enter your domain: `example.com` (or `www.example.com`)
3. **Click "Save"**
4. **Wait for DNS check** (green checkmark appears)
5. **Enable "Enforce HTTPS"** (for security)

---

## 📁 Step 6: Organize Your GitHub Repository

### **Recommended Structure:**

```
mohammedalsakkaf2003.github.io/
│
├── index.html                     # Main portfolio page
├── style.css                      # Portfolio styles
├── script.js                      # Portfolio scripts
├── README.md                      # About your portfolio
│
├── projects/                      # Projects showcase
│   ├── quizzup/                   # QuizzUp project
│   │   ├── index.html             # QuizzUp demo/info page
│   │   ├── screenshots/
│   │   └── README.md
│   │
│   └── future-project/            # Future projects
│
├── assets/                        # Static assets
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── quizzup-screenshot.png
│   │   └── ...
│   ├── icons/
│   └── documents/
│       └── resume.pdf
│
└── CNAME                          # Custom domain file (auto-created)
```

---

## 🎨 Step 7: Update Portfolio to Link Projects

### **In your Portfolio index.html:**

Add links to your projects:

```html
<!-- QuizzUp Project Card -->
<div class="project-card">
    <h3>QuizzUp - Learning Platform</h3>
    <p>Premium quiz and learning management system</p>
    <img src="assets/images/quizzup-screenshot.png" alt="QuizzUp">
    <div class="project-links">
        <a href="projects/quizzup/" target="_blank">View Demo</a>
        <a href="https://github.com/mohammedalsakkaf2003/quizzup" target="_blank">View Code</a>
    </div>
</div>
```

---

## 📊 Step 8: Upload QuizzUp as Separate Project (Optional)

### **Option 1: Include in Portfolio Repository**
```
portfolio/
└── projects/
    └── quizzup/
        └── (QuizzUp files here)
```

### **Option 2: Separate Repository**
1. Create new repository: `quizzup-pro`
2. Upload QuizzUp files there
3. Enable GitHub Pages for that repo
4. Link from portfolio: `https://mohammedalsakkaf2003.github.io/quizzup-pro/`

---

## ✅ Step 9: Verification Checklist

After setup, verify:

- [ ] Portfolio is live on GitHub Pages
- [ ] Custom domain points to GitHub Pages
- [ ] HTTPS is enabled
- [ ] All images load correctly
- [ ] All links work
- [ ] Projects are accessible
- [ ] Mobile responsive
- [ ] No broken links

---

## 🔍 Testing Your Setup

### **Test URLs:**

1. **GitHub Pages URL:**
   - `https://mohammedalsakkaf2003.github.io/`

2. **Custom Domain:**
   - `https://your-domain.com`
   - `https://www.your-domain.com`

3. **Project Pages:**
   - `https://your-domain.com/projects/quizzup/`

### **Test Checklist:**
- [ ] Homepage loads
- [ ] Images display
- [ ] Links work
- [ ] Projects accessible
- [ ] Mobile view works
- [ ] HTTPS works (green padlock)

---

## 🚀 Quick Start Commands

### **If you want me to help you set this up:**

**Tell me:**
1. ✅ Your domain name (e.g., `petrospecial.com`)
2. ✅ Which portfolio you want to use (Interactive or Professional)
3. ✅ Do you want QuizzUp as a separate repository or included in portfolio?

**Then I can:**
- ✅ Prepare the exact files to upload
- ✅ Give you step-by-step commands
- ✅ Help configure everything correctly

---

## 📝 Example: Complete Setup

### **Scenario:**
- Domain: `petrospecial.com`
- Portfolio: Interactive version
- QuizzUp: Included in portfolio

### **Steps:**

1. **Create repository:** `mohammedalsakkaf2003.github.io`

2. **Upload structure:**
```
mohammedalsakkaf2003.github.io/
├── index.html (from Portfolio/)
├── portfolio-style.css (from Portfolio/)
├── portfolio-script.js (from Portfolio/)
├── projects/
│   └── quizzup/
│       └── (QuizzUp files)
└── assets/
    └── images/
```

3. **Enable GitHub Pages**

4. **Configure DNS:**
   - A records → GitHub IPs
   - CNAME → mohammedalsakkaf2003.github.io

5. **Add custom domain:** `petrospecial.com`

6. **Result:** `https://petrospecial.com` shows YOUR portfolio!

---

## 🎯 What Happens After Setup

### **When someone visits your domain:**

```
User types: petrospecial.com
        ↓
DNS redirects to: GitHub Pages
        ↓
GitHub serves: Your Portfolio
        ↓
User sees: Your projects, QuizzUp, contact info
```

**The company website is NOT visible - only YOUR portfolio!**

---

## 💡 Pro Tips

### **1. Use GitHub Desktop (Easier)**
- Download: https://desktop.github.com/
- Drag and drop files
- Click "Commit" and "Push"
- No command line needed!

### **2. Keep Projects Updated**
- When you build new projects, add them to `projects/` folder
- Update portfolio homepage to showcase them
- Commit and push changes

### **3. Use README.md**
- Add a good README to your repository
- Explain what the portfolio contains
- Add screenshots

---

## 🆘 Common Issues & Solutions

### **Issue 1: "404 Page Not Found"**
**Solution:**
- Check if GitHub Pages is enabled
- Verify `index.html` is in root folder
- Wait 5-10 minutes after enabling Pages

### **Issue 2: "Domain not connecting"**
**Solution:**
- DNS changes take 24-48 hours
- Verify DNS records are correct
- Check GitHub Pages custom domain setting

### **Issue 3: "Images not loading"**
**Solution:**
- Use relative paths: `./assets/images/photo.jpg`
- Not absolute paths: `/assets/images/photo.jpg`
- Check file names (case-sensitive!)

---

## 📞 Next Steps

**Ready to deploy? Tell me:**

1. **Your domain name:** _____________
2. **Which portfolio:** Interactive / Professional
3. **QuizzUp placement:** Separate repo / Included in portfolio

**And I'll give you:**
- ✅ Exact file structure to upload
- ✅ Step-by-step commands
- ✅ DNS configuration details
- ✅ Everything ready to go!

---

<div align="center">

### **🚀 Let's Get Your Portfolio Live!**

**Your work deserves to be seen by the world!**

</div>

---

<div align="center">
  <sub>Deployment guide for Mohammed Al-Sakkaf. 2026.</sub>
</div>
