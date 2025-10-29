import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const SMS_API_URL = 'https://functions.poehali.dev/3435e395-e2f4-4083-b5f9-45aa97f38b94';

export default function SMSTest() {
  const [phone, setPhone] = useState('+79994523500');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const sendCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(SMS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send',
          phone: phone
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Код отправлен! Проверьте телефон.');
        setCodeSent(true);
      } else {
        toast.error('Ошибка отправки: ' + (data.error || 'Неизвестная ошибка'));
      }
    } catch (error) {
      toast.error('Ошибка соединения');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(SMS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          phone: phone,
          code: code
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Код верный! Токен получен.');
        console.log('Token:', data.token);
      } else {
        toast.error('Неверный код или истек срок');
      }
    } catch (error) {
      toast.error('Ошибка проверки');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="MessageSquare" size={24} />
              Тест SMS.RU
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Номер телефона
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+79991234567"
              />
            </div>

            <Button
              onClick={sendCode}
              disabled={loading || !phone}
              className="w-full"
            >
              {loading ? (
                <Icon name="Loader2" className="animate-spin mr-2" size={18} />
              ) : (
                <Icon name="Send" className="mr-2" size={18} />
              )}
              Отправить код
            </Button>

            {codeSent && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Код из СМС
                  </label>
                  <Input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                  />
                </div>

                <Button
                  onClick={verifyCode}
                  disabled={loading || !code}
                  className="w-full"
                  variant="secondary"
                >
                  {loading ? (
                    <Icon name="Loader2" className="animate-spin mr-2" size={18} />
                  ) : (
                    <Icon name="CheckCircle" className="mr-2" size={18} />
                  )}
                  Проверить код
                </Button>
              </>
            )}

            <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Как работает:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Нажмите "Отправить код"</li>
                <li>Код придет на указанный телефон</li>
                <li>Введите код и проверьте</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
