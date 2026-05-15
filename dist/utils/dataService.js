/**
 * Data Service Utility
 * Provides functions to interact with Firebase Firestore
 */

// Wait for Firestore to be available
async function getDb() {
  if (window.db) {
    return window.db;
  }
  
  // Wait up to 5 seconds for db to be available
  const startTime = Date.now();
  while (!window.db && (Date.now() - startTime) < 5000) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  if (!window.db) {
    throw new Error('Firestore not available. Make sure firebase-config.js is loaded.');
  }
  
  return window.db;
}

// Get current user ID
function getUserId() {
  if (!window.auth || !window.auth.currentUser) {
    return null;
  }
  return window.auth.currentUser.uid;
}

const demoDate = new Date('2026-05-14T21:15:00-04:00').toISOString();
const demoDebts = [
  {
    id: 'demo-credit-card',
    name: 'Credit Card',
    balance: 3500,
    interestRate: 22.9,
    minimumPayment: 120,
    dueDate: '2026-06-01',
    createdAt: demoDate
  },
  {
    id: 'demo-student-loan',
    name: 'Student Loan',
    balance: 25000,
    interestRate: 5.8,
    minimumPayment: 275,
    dueDate: '2026-06-15',
    createdAt: demoDate
  },
  {
    id: 'demo-auto-loan',
    name: 'Auto Loan',
    balance: 22500,
    interestRate: 7.2,
    minimumPayment: 410,
    dueDate: '2026-06-20',
    createdAt: demoDate
  }
];

const demoBudgets = [
  { id: 'demo-food', category: 'Food & Dining', budgetedAmount: 600, spentAmount: 420.5, month: '2026-04', createdAt: demoDate },
  { id: 'demo-utilities', category: 'Utilities', budgetedAmount: 300, spentAmount: 275, month: '2026-04', createdAt: demoDate },
  { id: 'demo-transportation', category: 'Transportation', budgetedAmount: 450, spentAmount: 330.75, month: '2026-04', createdAt: demoDate },
  { id: 'demo-entertainment', category: 'Entertainment', budgetedAmount: 400, spentAmount: 370, month: '2026-04', createdAt: demoDate }
];

const demoSavingsGoals = [
  { id: 'demo-emergency', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 6500, targetDate: '2026-12-31', priority: 2, createdAt: demoDate },
  { id: 'demo-vacation', name: 'Vacation Fund', targetAmount: 3000, currentAmount: 1200, targetDate: '2026-08-15', priority: 1, createdAt: demoDate },
  { id: 'demo-home', name: 'Home Down Payment', targetAmount: 50000, currentAmount: 2500, targetDate: '2028-05-01', priority: 3, createdAt: demoDate }
];

const demoNetWorth = {
  id: 'demo-net-worth',
  assets: 48000,
  liabilities: 40500,
  date: demoDate,
  createdAt: demoDate
};

const demoActivities = [
  { id: 'demo-activity-budget', type: 'budget', description: 'Created budget: Food & Dining', amount: 600, date: demoDate },
  { id: 'demo-activity-goal', type: 'goal', description: 'Set savings goal: Emergency Fund', amount: 10000, date: demoDate },
  { id: 'demo-activity-debt', type: 'debt', description: 'Added debt: Credit Card', amount: -3500, date: demoDate },
  { id: 'demo-activity-networth', type: 'networth', description: 'Updated net worth', amount: 7500, date: demoDate }
];

function cloneDemoData(data) {
  return JSON.parse(JSON.stringify(data));
}

// Import Firestore functions dynamically
async function getFirestoreFunctions() {
  const { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp } = 
    await import('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js');
  return { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp };
}

// ========== DEBT OPERATIONS ==========
window.DataService = window.DataService || {};

window.DataService.getDebts = async function() {
  const userId = getUserId();
  if (!userId) return cloneDemoData(demoDebts);
  
  const db = await getDb();
  const { collection, query, where, orderBy, getDocs } = await getFirestoreFunctions();
  
  const debtsRef = collection(db, 'debts');
  const q = query(debtsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

window.DataService.addDebt = async function(debtData) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { collection, addDoc, Timestamp } = await getFirestoreFunctions();
  
  // Convert date string to Timestamp if provided
  let dueDate = null;
  if (debtData.dueDate) {
    if (typeof debtData.dueDate === 'string') {
      // Date string from HTML date input (YYYY-MM-DD format)
      const date = new Date(debtData.dueDate + 'T00:00:00'); // Add time to avoid timezone issues
      dueDate = Timestamp.fromDate(date);
    } else if (debtData.dueDate.toDate) {
      // Already a Timestamp
      dueDate = debtData.dueDate;
    } else if (debtData.dueDate instanceof Date) {
      // Already a Date object
      dueDate = Timestamp.fromDate(debtData.dueDate);
    }
  }
  
  const debtsRef = collection(db, 'debts');
  const newDebt = {
    userId,
    name: debtData.name,
    balance: parseFloat(debtData.balance),
    interestRate: parseFloat(debtData.interestRate),
    minimumPayment: parseFloat(debtData.minimumPayment),
    dueDate: dueDate,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  
  const docRef = await addDoc(debtsRef, newDebt);
  return docRef.id;
};

window.DataService.updateDebt = async function(debtId, debtData) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { doc, updateDoc, Timestamp } = await getFirestoreFunctions();
  
  // Convert date string to Timestamp if provided
  let dueDate = null;
  if (debtData.dueDate) {
    if (typeof debtData.dueDate === 'string') {
      // Date string from HTML date input (YYYY-MM-DD format)
      const date = new Date(debtData.dueDate + 'T00:00:00'); // Add time to avoid timezone issues
      dueDate = Timestamp.fromDate(date);
    } else if (debtData.dueDate.toDate) {
      // Already a Timestamp
      dueDate = debtData.dueDate;
    } else if (debtData.dueDate instanceof Date) {
      // Already a Date object
      dueDate = Timestamp.fromDate(debtData.dueDate);
    }
  } else if (debtData.dueDate === null || debtData.dueDate === '') {
    // Explicitly set to null if empty string
    dueDate = null;
  }
  
  const debtRef = doc(db, 'debts', debtId);
  const updateData = {
    name: debtData.name,
    balance: parseFloat(debtData.balance),
    interestRate: parseFloat(debtData.interestRate),
    minimumPayment: parseFloat(debtData.minimumPayment),
    dueDate: dueDate,
    updatedAt: Timestamp.now()
  };
  
  await updateDoc(debtRef, updateData);
};

window.DataService.deleteDebt = async function(debtId) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { doc, deleteDoc } = await getFirestoreFunctions();
  
  const debtRef = doc(db, 'debts', debtId);
  await deleteDoc(debtRef);
};

// ========== BUDGET OPERATIONS ==========
window.DataService.getBudgets = async function() {
  const userId = getUserId();
  if (!userId) return cloneDemoData(demoBudgets);
  
  const db = await getDb();
  const { collection, query, where, orderBy, getDocs } = await getFirestoreFunctions();
  
  const budgetsRef = collection(db, 'budgets');
  const q = query(budgetsRef, where('userId', '==', userId), orderBy('month', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

window.DataService.addBudget = async function(budgetData) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { collection, addDoc, Timestamp } = await getFirestoreFunctions();
  
  const budgetsRef = collection(db, 'budgets');
  const newBudget = {
    userId,
    category: budgetData.category,
    budgetedAmount: parseFloat(budgetData.budgetedAmount),
    spentAmount: parseFloat(budgetData.spentAmount || 0),
    month: budgetData.month,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  
  const docRef = await addDoc(budgetsRef, newBudget);
  return docRef.id;
};

window.DataService.updateBudget = async function(budgetId, budgetData) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { doc, updateDoc, Timestamp } = await getFirestoreFunctions();
  
  const budgetRef = doc(db, 'budgets', budgetId);
  const updateData = {
    ...budgetData,
    budgetedAmount: parseFloat(budgetData.budgetedAmount),
    spentAmount: parseFloat(budgetData.spentAmount || 0),
    updatedAt: Timestamp.now()
  };
  
  await updateDoc(budgetRef, updateData);
};

window.DataService.deleteBudget = async function(budgetId) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { doc, deleteDoc } = await getFirestoreFunctions();
  
  const budgetRef = doc(db, 'budgets', budgetId);
  await deleteDoc(budgetRef);
};

// ========== SAVINGS GOAL OPERATIONS ==========
window.DataService.getSavingsGoals = async function() {
  const userId = getUserId();
  if (!userId) return cloneDemoData(demoSavingsGoals);
  
  const db = await getDb();
  const { collection, query, where, orderBy, getDocs } = await getFirestoreFunctions();
  
  const goalsRef = collection(db, 'savingsGoals');
  const q = query(goalsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

window.DataService.addSavingsGoal = async function(goalData) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { collection, addDoc, Timestamp } = await getFirestoreFunctions();
  
  const goalsRef = collection(db, 'savingsGoals');
  const newGoal = {
    userId,
    name: goalData.name,
    targetAmount: parseFloat(goalData.targetAmount),
    currentAmount: parseFloat(goalData.currentAmount || 0),
    targetDate: goalData.targetDate || null,
    priority: parseInt(goalData.priority || 1),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  
  const docRef = await addDoc(goalsRef, newGoal);
  return docRef.id;
};

window.DataService.updateSavingsGoal = async function(goalId, goalData) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { doc, updateDoc, Timestamp } = await getFirestoreFunctions();
  
  const goalRef = doc(db, 'savingsGoals', goalId);
  const updateData = {
    ...goalData,
    targetAmount: parseFloat(goalData.targetAmount),
    currentAmount: parseFloat(goalData.currentAmount || 0),
    updatedAt: Timestamp.now()
  };
  
  await updateDoc(goalRef, updateData);
};

window.DataService.deleteSavingsGoal = async function(goalId) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { doc, deleteDoc } = await getFirestoreFunctions();
  
  const goalRef = doc(db, 'savingsGoals', goalId);
  await deleteDoc(goalRef);
};

// ========== NET WORTH OPERATIONS ==========
window.DataService.getNetWorth = async function() {
  const userId = getUserId();
  if (!userId) return cloneDemoData(demoNetWorth);
  
  const db = await getDb();
  const { collection, query, where, orderBy, limit, getDocs } = await getFirestoreFunctions();
  
  const netWorthRef = collection(db, 'netWorth');
  const q = query(netWorthRef, where('userId', '==', userId), orderBy('date', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

window.DataService.saveNetWorth = async function(netWorthData) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { collection, addDoc, Timestamp } = await getFirestoreFunctions();
  
  const netWorthRef = collection(db, 'netWorth');
  const newNetWorth = {
    userId,
    assets: parseFloat(netWorthData.assets || 0),
    liabilities: parseFloat(netWorthData.liabilities || 0),
    date: Timestamp.now(),
    createdAt: Timestamp.now()
  };
  
  const docRef = await addDoc(netWorthRef, newNetWorth);
  return docRef.id;
};

// ========== ACTIVITY OPERATIONS ==========
window.DataService.getActivities = async function(limitCount = 50) {
  const userId = getUserId();
  if (!userId) return cloneDemoData(demoActivities).slice(0, limitCount);
  
  const db = await getDb();
  const { collection, query, where, orderBy, limit, getDocs } = await getFirestoreFunctions();
  
  const activitiesRef = collection(db, 'activities');
  const q = query(activitiesRef, where('userId', '==', userId), orderBy('date', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

window.DataService.addActivity = async function(activityData) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');
  
  const db = await getDb();
  const { collection, addDoc, Timestamp } = await getFirestoreFunctions();
  
  const activitiesRef = collection(db, 'activities');
  const newActivity = {
    userId,
    type: activityData.type,
    description: activityData.description,
    amount: parseFloat(activityData.amount || 0),
    date: Timestamp.now(),
    createdAt: Timestamp.now()
  };
  
  const docRef = await addDoc(activitiesRef, newActivity);
  return docRef.id;
};

// Helper to format Timestamp for display
window.DataService.formatDate = function(timestamp) {
  if (!timestamp) return '';
  if (timestamp.toDate) {
    return timestamp.toDate().toLocaleDateString();
  }
  if (timestamp instanceof Date) {
    return timestamp.toLocaleDateString();
  }
  return new Date(timestamp).toLocaleDateString();
};

// Helper to format currency
window.DataService.formatCurrency = function(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0);
};

console.log('[DataService] Data service utility loaded');
