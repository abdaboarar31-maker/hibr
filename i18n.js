const LANGS = {
  ar: { name: 'العربية', dir: 'rtl' },
  en: { name: 'English', dir: 'ltr' },
  fr: { name: 'Français', dir: 'ltr' },
  es: { name: 'Español', dir: 'ltr' }
};

const TX = {
  ar: {
    home: 'الرئيسية', library: 'مكتبتي', cart: 'السلة', cartEmpty: 'سلتك فاضية. أضف كتاباً لتبدأ.',
    total: 'المجموع', checkout: 'إتمام الطلب', add: 'أضف للسلة', added: 'تمت الإضافة إلى السلة',
    already: 'الكتاب موجود بسلتك', heroH: 'كل كتاب بيبدأ بحكاية.',
    heroP: 'اشترِ كتابك وحمّله فوراً بصيغة PDF.', browse: 'تصفّح الأقسام',
    heroSearch: 'ابحث عن كتاب أو مؤلف...', allCats: 'أقسام المكتبة', featured: 'اخترنا لك', booksN: 'كتب',
    search: 'ابحث في هذا القسم...', sortDef: 'الترتيب الافتراضي', sortLow: 'السعر: الأقل أولاً',
    sortHigh: 'السعر: الأعلى أولاً', sortAz: 'الاسم (أ - ي)', noRes: 'ما في نتائج. جرّب كلمة ثانية.',
    how: 'كيف تشتري؟', s1: 'اختر كتابك', s2: 'ادفع بالطريقة اللي بتناسبك', s3: 'حمّله فوراً',
    bought: 'كتبي المشتراة', libEmpty: 'ما اشتريت أي كتاب بعد.', favT: 'مفضلتي', favEmpty: 'اضغط ♥ على أي كتاب لتحفظه هون.',
    download: 'تحميل PDF', shop: 'تسوّق الآن', details: 'بياناتك', name: 'الاسم الكامل', email: 'البريد الإلكتروني',
    emailNote: 'بنرسل لك نسخة من رابط التحميل على هذا الإيميل.', country: 'الدولة (اختياري)',
    payTitle: 'طريقة الدفع', pay_card: 'بطاقة بنكية', pay_bank: 'تحويل بنكي', pay_wallet: 'محفظة إلكترونية', pay_crypto: 'عملات رقمية',
    cardNum: 'رقم البطاقة', exp: 'تاريخ الانتهاء', cvv: 'رمز الأمان',
    demoNote: 'نموذج تجريبي: البيانات ما بتنرسل لأي مكان. للدفع الحقيقي اربط الموقع ببوابة دفع.',
    bankNote: 'بتظهر لك بيانات الحساب البنكي بعد تأكيد الطلب.', redirectNote: 'رح تنتقل لصفحة المزوّد لإتمام الدفع بأمان.',
    summary: 'ملخص الطلب', confirm: 'ادفع وحمّل الكتب', thanks: 'تم استلام طلبك!',
    doneMsg: 'شكراً {name}! رقم طلبك {no}. حمّل كتبك من الأزرار تحت، وبتلاقيها دايماً بصفحة «مكتبتي».',
    emptyCheckout: 'سلتك فاضية.', tagline: 'مكتبتك الإلكترونية لكل الأعمار.', credit: 'تصميم وتطوير:',
    c_draw: 'رسم للأطفال', c_kids: 'قصص أطفال', c_novel: 'روايات', c_self: 'تطوير الذات', c_history: 'تاريخ',
    c_religion: 'كتب دينية', c_science: 'علوم', c_cook: 'طبخ', c_code: 'برمجة', c_poetry: 'شعر'
  },
  en: {
    home: 'Home', library: 'My Library', cart: 'Cart', cartEmpty: 'Your cart is empty. Add a book to start.',
    total: 'Total', checkout: 'Checkout', add: 'Add to cart', added: 'Added to cart',
    already: 'This book is already in your cart', heroH: 'Every book starts with a story.',
    heroP: 'Buy your book and download it instantly as a PDF.', browse: 'Browse sections',
    heroSearch: 'Search a book or author...', allCats: 'Library sections', featured: 'Picked for you', booksN: 'books',
    search: 'Search in this section...', sortDef: 'Default order', sortLow: 'Price: low to high',
    sortHigh: 'Price: high to low', sortAz: 'Name (A - Z)', noRes: 'No results. Try another word.',
    how: 'How it works', s1: 'Pick your book', s2: 'Pay your way', s3: 'Download instantly',
    bought: 'My purchased books', libEmpty: 'You haven\'t bought any books yet.', favT: 'My favorites', favEmpty: 'Tap ♥ on any book to save it here.',
    download: 'Download PDF', shop: 'Shop now', details: 'Your details', name: 'Full name', email: 'Email',
    emailNote: 'We\'ll send a copy of the download link to this email.', country: 'Country (optional)',
    payTitle: 'Payment method', pay_card: 'Bank card', pay_bank: 'Bank transfer', pay_wallet: 'E-wallet', pay_crypto: 'Crypto',
    cardNum: 'Card number', exp: 'Expiry date', cvv: 'Security code',
    demoNote: 'Demo form: nothing is sent anywhere. For real payments, connect the site to a payment gateway.',
    bankNote: 'Bank account details appear after you confirm the order.', redirectNote: 'You will be redirected to the provider to pay securely.',
    summary: 'Order summary', confirm: 'Pay and download', thanks: 'Order received!',
    doneMsg: 'Thank you {name}! Your order number is {no}. Download your books below; they always stay in "My Library".',
    emptyCheckout: 'Your cart is empty.', tagline: 'Your online bookstore for all ages.', credit: 'Designed and developed by:',
    c_draw: 'Kids\' Drawing', c_kids: 'Kids\' Stories', c_novel: 'Novels', c_self: 'Self-Development', c_history: 'History',
    c_religion: 'Religious Books', c_science: 'Science', c_cook: 'Cooking', c_code: 'Programming', c_poetry: 'Poetry'
  },
  fr: {
    home: 'Accueil', library: 'Ma bibliothèque', cart: 'Panier', cartEmpty: 'Votre panier est vide. Ajoutez un livre.',
    total: 'Total', checkout: 'Paiement', add: 'Ajouter au panier', added: 'Ajouté au panier',
    already: 'Ce livre est déjà dans votre panier', heroH: 'Chaque livre commence par une histoire.',
    heroP: 'Achetez votre livre et téléchargez-le immédiatement en PDF.', browse: 'Parcourir les rubriques',
    heroSearch: 'Rechercher un livre ou un auteur...', allCats: 'Rubriques', featured: 'Notre sélection', booksN: 'livres',
    search: 'Rechercher dans cette rubrique...', sortDef: 'Ordre par défaut', sortLow: 'Prix croissant',
    sortHigh: 'Prix décroissant', sortAz: 'Nom (A - Z)', noRes: 'Aucun résultat. Essayez un autre mot.',
    how: 'Comment ça marche ?', s1: 'Choisissez votre livre', s2: 'Payez comme vous voulez', s3: 'Téléchargez aussitôt',
    bought: 'Mes livres achetés', libEmpty: 'Vous n\'avez encore acheté aucun livre.', favT: 'Mes favoris', favEmpty: 'Touchez ♥ sur un livre pour le garder ici.',
    download: 'Télécharger le PDF', shop: 'Acheter maintenant', details: 'Vos informations', name: 'Nom complet', email: 'E-mail',
    emailNote: 'Nous enverrons une copie du lien de téléchargement à cet e-mail.', country: 'Pays (facultatif)',
    payTitle: 'Mode de paiement', pay_card: 'Carte bancaire', pay_bank: 'Virement bancaire', pay_wallet: 'Portefeuille électronique', pay_crypto: 'Cryptomonnaie',
    cardNum: 'Numéro de carte', exp: 'Date d\'expiration', cvv: 'Code de sécurité',
    demoNote: 'Formulaire de démonstration : rien n\'est envoyé. Pour de vrais paiements, connectez une passerelle de paiement.',
    bankNote: 'Les coordonnées bancaires s\'affichent après confirmation.', redirectNote: 'Vous serez redirigé vers le prestataire pour payer en sécurité.',
    summary: 'Récapitulatif', confirm: 'Payer et télécharger', thanks: 'Commande reçue !',
    doneMsg: 'Merci {name} ! Votre numéro de commande est {no}. Téléchargez vos livres ci-dessous, ils restent dans « Ma bibliothèque ».',
    emptyCheckout: 'Votre panier est vide.', tagline: 'Votre librairie en ligne pour tous les âges.', credit: 'Conçu et développé par :',
    c_draw: 'Dessin enfants', c_kids: 'Contes enfants', c_novel: 'Romans', c_self: 'Développement personnel', c_history: 'Histoire',
    c_religion: 'Livres religieux', c_science: 'Sciences', c_cook: 'Cuisine', c_code: 'Programmation', c_poetry: 'Poésie'
  },
  es: {
    home: 'Inicio', library: 'Mi biblioteca', cart: 'Carrito', cartEmpty: 'Tu carrito está vacío. Añade un libro.',
    total: 'Total', checkout: 'Finalizar compra', add: 'Añadir al carrito', added: 'Añadido al carrito',
    already: 'Este libro ya está en tu carrito', heroH: 'Cada libro empieza con una historia.',
    heroP: 'Compra tu libro y descárgalo al instante en PDF.', browse: 'Ver secciones',
    heroSearch: 'Busca un libro o autor...', allCats: 'Secciones', featured: 'Elegidos para ti', booksN: 'libros',
    search: 'Buscar en esta sección...', sortDef: 'Orden predeterminado', sortLow: 'Precio: menor a mayor',
    sortHigh: 'Precio: mayor a menor', sortAz: 'Nombre (A - Z)', noRes: 'Sin resultados. Prueba otra palabra.',
    how: '¿Cómo funciona?', s1: 'Elige tu libro', s2: 'Paga como prefieras', s3: 'Descárgalo al instante',
    bought: 'Mis libros comprados', libEmpty: 'Aún no has comprado ningún libro.', favT: 'Mis favoritos', favEmpty: 'Toca ♥ en un libro para guardarlo aquí.',
    download: 'Descargar PDF', shop: 'Comprar ahora', details: 'Tus datos', name: 'Nombre completo', email: 'Correo electrónico',
    emailNote: 'Enviaremos una copia del enlace de descarga a este correo.', country: 'País (opcional)',
    payTitle: 'Método de pago', pay_card: 'Tarjeta bancaria', pay_bank: 'Transferencia bancaria', pay_wallet: 'Monedero electrónico', pay_crypto: 'Criptomonedas',
    cardNum: 'Número de tarjeta', exp: 'Fecha de caducidad', cvv: 'Código de seguridad',
    demoNote: 'Formulario de demostración: no se envía nada. Para pagos reales, conecta una pasarela de pago.',
    bankNote: 'Los datos bancarios aparecen tras confirmar el pedido.', redirectNote: 'Serás redirigido al proveedor para pagar de forma segura.',
    summary: 'Resumen del pedido', confirm: 'Pagar y descargar', thanks: '¡Pedido recibido!',
    doneMsg: '¡Gracias {name}! Tu número de pedido es {no}. Descarga tus libros abajo; siempre quedan en «Mi biblioteca».',
    emptyCheckout: 'Tu carrito está vacío.', tagline: 'Tu librería online para todas las edades.', credit: 'Diseñado y desarrollado por:',
    c_draw: 'Dibujo infantil', c_kids: 'Cuentos infantiles', c_novel: 'Novelas', c_self: 'Desarrollo personal', c_history: 'Historia',
    c_religion: 'Libros religiosos', c_science: 'Ciencias', c_cook: 'Cocina', c_code: 'Programación', c_poetry: 'Poesía'
  }
};

let LANG = 'ar';
try {
  const saved = localStorage.getItem('hibr-lang');
  const nav = (navigator.language || 'ar').slice(0, 2);
  LANG = LANGS[saved] ? saved : (LANGS[nav] ? nav : 'ar');
} catch (e) {}

const t = k => TX[LANG][k] || TX.ar[k] || k;
document.documentElement.lang = LANG;
document.documentElement.dir = LANGS[LANG].dir;