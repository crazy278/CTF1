# 🐙 كيفية رفع الموقع على GitHub (خطوة بخطوة)

## 📋 **المتطلبات:**
- حساب GitHub (مجاني)
- Git مثبت على جهازك

## 🚀 **الخطوات (5 دقائق فقط):**

### **1️⃣ إنشاء حساب GitHub:**
1. اذهب إلى [github.com](https://github.com)
2. اضغط "Sign up"
3. املأ البيانات (اسم، إيميل، كلمة مرور)
4. تحقق من الإيميل
5. اضغط "New repository"

### **2️⃣ إنشاء مستودع جديد:**
1. **Repository name:** `mahdi-week`
2. **Description:** `أسبوع صاحب العصر والزمان - موقع تفاعلي`
3. اختر **Public**
4. اضغط "Create repository"

### **3️⃣ رفع الملفات (الطريقة السهلة):**

#### **الخيار A: رفع الملفات مباشرة (للمبتدئين):**
1. في صفحة المستودع، اضغط "uploading an existing file"
2. اسحب جميع ملفات الموقع أو اضغط "choose your files"
3. **الملفات المهمة للرفع:**
   - ✅ `index-netlify.html`
   - ✅ `admin-netlify.html`
   - ✅ `script-netlify.js`
   - ✅ `admin-netlify.js`
   - ✅ `style.css`
   - ✅ `netlify.toml`
4. في أسفل الصفحة، اكتب: `Initial commit`
5. اضغط "Commit changes"

#### **الخيار B: استخدام Git (للمحترفين):**
```bash
# افتح Terminal/CMD في مجلد المشروع
cd C:\Users\Ali Aoun\Downloads\CTF1

# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# أول commit
git commit -m "Initial commit - Mahdi Week Website"

# ربط بـ GitHub
git remote add origin https://github.com/username/mahdi-week.git

# رفع الملفات
git branch -M main
git push -u origin main
```

### **4️⃣ التحقق من الرفع:**
1. اذهب إلى صفحة المستودع
2. يجب أن ترى جميع الملفات
3. اضغط على `index-netlify.html` لرؤية الموقع

## 🔗 **الروابط بعد الرفع:**

### **GitHub Pages (مجاني):**
1. في مستودعك، اذهب إلى **Settings**
2. اضغط **Pages** في القائمة اليسرى
3. اختر **Source:** Deploy from a branch
4. اختر **Branch:** main
5. اختر **Folder:** /root
6. اضغط **Save**

**بعد دقيقتين، الموقع سيكون على:**
```
https://username.github.io/mahdi-week
```

### **Netlify (الأفضل):**
1. اذهب إلى [netlify.com](https://netlify.com)
2. سجل الدخول بـ GitHub
3. اضغط "Add new site" → "Import an existing project"
4. اختر مستودع `mahdi-week`
5. اضغط "Deploy site"

**الموقع سيكون على:**
```
https://random-name.netlify.app
```

## 📱 **الملفات التي يجب رفعها:**

### **لـ Netlify (موصى به):**
- ✅ `index-netlify.html`
- ✅ `admin-netlify.html`
- ✅ `script-netlify.js`
- ✅ `admin-netlify.js`
- ✅ `style.css`
- ✅ `netlify.toml`

### **ملفات إضافية:**
- ✅ `README.md`
- ✅ `.gitignore`
- ✅ `package.json`

## 🎯 **بعد الرفع:**

### **اختبار الموقع:**
1. افتح الرابط في متصفحك
2. جرب التسجيل
3. افتح لوحة التحكم بكلمة المرور `admin123`
4. شاهد البيانات تظهر

### **مشاركة الموقع:**
- 📱 **شارك الرابط** مع الأصدقاء
- 📊 **شاهد التسجيلات** تصل مباشرة
- 🔐 **لوحة تحكم** لرؤية البيانات

## 🔧 **مشاكل وحلول:**

### **مشكلة: "Permission denied"**
```bash
# حل: تكوين Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### **مشكلة: "Repository not found"**
- تأكد من اسم المستودع صحيح
- تأكد من ربط GitHub بـ Git

### **مشكلة: "Files not uploading"**
- تأكد من إضافة الملفات الصحيحة
- تحقق من حجم الملفات (أقل من 100MB)

## 🎉 **النتيجة النهائية:**

**موقعك سيكون متاحاً للعالم بأكمله!**
- 🌍 **من أي دولة**
- 📱 **على أي جهاز**
- ✨ **بشكل مجاني**
- 🔐 **مع لوحة تحكم آمنة**

**هل تريدني أساعدك في أي خطوة من هذه الخطوات؟** 🚀✨
