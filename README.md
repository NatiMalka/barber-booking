# מערכת זימון תורים לספר (Barber Appointment Booking System)

מערכת מודרנית לזימון תורים אונליין לספר, כתובה בעברית עם תמיכה ב-RTL.

## תכונות עיקריות

### צד הלקוח
- הזמנת תור חדש בממשק נוח וידידותי
- בחירת תאריך ושעה לתור
- הגדרת מספר אנשים לתספורת
- בחירת אמצעי התראה (WhatsApp, Email, SMS)
- צפייה בסטטוס התור (ממתין לאישור, מאושר, נדחה)
- ביטול תורים קיימים

### צד הספר (מנהל)
- דף כניסה עם סיסמה פשוטה
- לוח בקרה עם סקירה כללית של התורים
- ניהול בקשות לתורים חדשים (אישור או דחייה)
- ניהול תורים מאושרים
- הגדרת שעות עבודה לכל יום בשבוע
- הגדרת ימים מיוחדים וחגים

## טכנולוגיות

- **Frontend:** React.js עם Next.js
- **UI Library:** Material UI
- **Animations:** Framer Motion
- **State Management:** React Hooks
- **Database:** Firebase Firestore
- **Authentication:** Simple password protection for admin
- **Deployment:** GitHub Pages

## התקנה והרצה

### דרישות מקדימות
- Node.js גרסה 16 ומעלה
- npm או yarn

### התקנה
1. שכפל את המאגר:
   ```
   git clone https://github.com/yourusername/barber-booking.git
   cd barber-booking
   ```

2. התקן את התלויות:
   ```
   npm install
   ```

### הרצה בסביבת פיתוח
```
npm run dev
```

הגש לדפדפן בכתובת http://localhost:3000

### בנייה לייצור
```
npm run build
```

### פריסה ב-GitHub Pages
```
npm run deploy
```

## קונפיגורציה

עדכן את קובץ `src/lib/firebase.ts` עם פרטי החיבור שלך ל-Firebase:
```typescript
// TODO: Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### סיסמת מנהל
סיסמת ברירת המחדל למנהל היא `admin123`. ניתן לשנות אותה בקובץ `src/app/admin/page.tsx`:
```typescript
// This would normally be stored securely in environment variables
const ADMIN_PASSWORD = 'admin123';
```

## מבנה הפרויקט

```
src/
├── app/                    # דפי האפליקציה
│   ├── client/             # ממשק לקוח
│   │   ├── components/     # קומפוננטות עבור הלקוח
│   │   └── page.tsx        # דף הבית ללקוח
│   ├── admin/              # ממשק מנהל
│   │   ├── dashboard/      # לוח בקרה למנהל
│   │   ├── settings/       # הגדרות זמינות
│   │   └── page.tsx        # דף כניסה למנהל
│   ├── globals.css         # סגנונות גלובליים
│   ├── layout.tsx          # תבנית כללית לכל האפליקציה
│   └── page.tsx            # דף הבית הראשי
├── lib/                    # ספריות וחיבורים
│   └── firebase.ts         # קונפיגורציית Firebase
└── types.d.ts              # הגדרות טיפוסים
```

## תרומה לפרויקט

אנו מעריכים כל תרומה לפרויקט. אם אתם רוצים לתרום:
1. צרו fork של הפרויקט
2. צרו branch עבור התכונה החדשה (`git checkout -b feature/amazing-feature`)
3. ערכו את השינויים שלכם
4. צרו commit (`git commit -m 'Add some amazing feature'`)
5. דחפו ל-branch (`git push origin feature/amazing-feature`)
6. פתחו בקשת משיכה (Pull Request)

## רישיון

פרויקט זה מופץ תחת רישיון MIT.
