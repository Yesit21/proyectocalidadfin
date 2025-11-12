// src\views\TablasMul.tsx
import { motion } from "framer-motion";
import { FaCalculator, FaBookOpen, FaBrain } from "react-icons/fa";
import MultiplicationTable from "../components/MultiplicationTable";

export default function TablasMul() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <FaCalculator className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Tablas de Multiplicar
          </h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Aprende y practica las tablas de multiplicar de forma interactiva. Ingresa un número y genera su tabla completa.
        </p>
      </motion.div>

      {/* Features Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 text-center">
          <FaBookOpen className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Aprendizaje Interactivo
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Genera tablas personalizadas según tus necesidades de estudio
          </p>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 text-center">
          <FaCalculator className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Resultados Instantáneos
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Obtén resultados al momento con cálculos precisos
          </p>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 text-center">
          <FaBrain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Desarrollo Mental
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Mejora tus habilidades matemáticas y memoria numérica
          </p>
        </div>
      </motion.div>

      {/* Main Component */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Generador de Tablas
          </h2>
        </div>
        <div className="p-8">
          <MultiplicationTable />
        </div>
      </motion.section>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50"
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <FaBrain className="w-5 h-5 text-emerald-500" />
          Consejos para Aprender
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
          <div>
            <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">Método de Repetición</h4>
            <p>Repite cada tabla varias veces hasta memorizarla completamente.</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">Patrones Numéricos</h4>
            <p>Observa patrones como 5× = múltiplos de 5 terminan en 0 o 5.</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">Relaciones</h4>
            <p>Conecta con sumas: 3×4 = 4+4+4 = 12.</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">Práctica Diaria</h4>
            <p>Dedica 10-15 minutos diarios para mejores resultados.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}