import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CompensationCalculator = () => {
  const [productCost, setProductCost] = useState<string>("");
  const [caseType, setCaseType] = useState<string>("");
  const [hasEvidence, setHasEvidence] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const calculateCompensation = () => {
    const cost = parseFloat(productCost);
    if (!cost || !caseType || !hasEvidence) return;

    let successChance = 0;
    const penalty = cost * 0.5;
    let moralDamage = 0;
    let totalCompensation = cost;

    if (hasEvidence === "full") {
      successChance = caseType === "quality" ? 95 : caseType === "service" ? 90 : 85;
    } else if (hasEvidence === "partial") {
      successChance = caseType === "quality" ? 80 : caseType === "service" ? 75 : 70;
    } else {
      successChance = caseType === "quality" ? 60 : caseType === "service" ? 55 : 50;
    }

    if (caseType === "quality") {
      moralDamage = Math.min(cost * 0.3, 10000);
      totalCompensation = cost + penalty + moralDamage;
    } else if (caseType === "service") {
      moralDamage = Math.min(cost * 0.25, 8000);
      totalCompensation = cost + penalty + moralDamage;
    } else {
      moralDamage = Math.min(cost * 0.2, 5000);
      totalCompensation = cost + penalty + moralDamage;
    }

    setCalculationResult({
      successChance,
      refund: cost,
      penalty,
      moralDamage,
      totalCompensation,
    });
  };

  return (
    <Card className="bg-white shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Calculator" className="h-6 w-6 text-primary" />
          Калькулятор компенсации
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Рассчитайте возможную сумму выплат и шансы на успех
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Стоимость товара/услуги (₽)</Label>
          <Input 
            type="number" 
            placeholder="Например: 50000"
            value={productCost}
            onChange={(e) => setProductCost(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Тип нарушения</Label>
          <Select value={caseType} onValueChange={setCaseType}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quality">Некачественный товар</SelectItem>
              <SelectItem value="service">Некачественная услуга</SelectItem>
              <SelectItem value="delay">Нарушение сроков</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Наличие доказательств</Label>
          <Select value={hasEvidence} onValueChange={setHasEvidence}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите вариант" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Полный пакет (чек, договор, фото/видео)</SelectItem>
              <SelectItem value="partial">Частичные доказательства</SelectItem>
              <SelectItem value="minimal">Минимальные</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full" 
          onClick={calculateCompensation}
          disabled={!productCost || !caseType || !hasEvidence}
        >
          <Icon name="TrendingUp" className="h-4 w-4 mr-2" />
          Рассчитать
        </Button>

        {calculationResult && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg space-y-3 border-2 border-green-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">Шанс выигрыша:</span>
              <Badge className="text-lg bg-green-600">
                {calculationResult.successChance}%
              </Badge>
            </div>
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Возврат стоимости:</span>
                <span className="font-semibold">{calculationResult.refund.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Неустойка (50%):</span>
                <span className="font-semibold">{calculationResult.penalty.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Моральный вред:</span>
                <span className="font-semibold">{calculationResult.moralDamage.toLocaleString()} ₽</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-base font-bold text-green-700">
                <span>ИТОГО к получению:</span>
                <span>{calculationResult.totalCompensation.toLocaleString()} ₽</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * Предварительный расчет. Точная сумма зависит от обстоятельств дела.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompensationCalculator;
