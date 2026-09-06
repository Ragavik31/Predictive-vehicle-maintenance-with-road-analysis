interface Model {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  rocAuc: number;
  selected?: boolean;
}

interface ModelComparisonTableProps {
  models: Model[];
}

export function ModelComparisonTable({ models }: ModelComparisonTableProps) {
  return (
    <div className="card p-6">
      <h3 className="font-semibold text-white">Model Comparison</h3>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="py-3 px-4 font-semibold text-slate-300">Model</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-300">Accuracy</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-300">Precision</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-300">Recall</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-300">F1 Score</th>
              <th className="py-3 px-4 text-right font-semibold text-slate-300">ROC-AUC</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr
                key={model.name}
                className={`border-b border-slate-800/70 transition-colors ${
                  model.selected ? 'bg-teal-400/5' : 'hover:bg-slate-800/50'
                }`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {model.selected && (
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-teal-400/20 text-teal-300 text-xs font-bold">
                        ★
                      </span>
                    )}
                    <span className="font-medium text-white">{model.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-slate-300">{(model.accuracy * 100).toFixed(3)}%</td>
                <td className="py-3 px-4 text-right text-slate-300">{(model.precision * 100).toFixed(3)}%</td>
                <td className="py-3 px-4 text-right text-slate-300">{(model.recall * 100).toFixed(3)}%</td>
                <td className="py-3 px-4 text-right text-slate-300">{(model.f1 * 100).toFixed(3)}%</td>
                <td className="py-3 px-4 text-right text-slate-300">{(model.rocAuc * 100).toFixed(3)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-lg border border-teal-400/20 bg-teal-400/5 p-4">
        <p className="text-sm text-teal-200">
          ⭐ <span className="font-medium">Selected Final Model:</span> Logistic Regression was chosen as the final model due to its superior overall performance in accuracy, precision, and F1 score.
        </p>
      </div>
    </div>
  );
}
