'use client';

import { useState } from 'react';
import { Mail, MapPin, School, Send, CheckCircle2 } from 'lucide-react';
import InfoPage from '@/components/layout/InfoPage';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (formData.message.trim().length < 10)
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock: em produção, enviar para a API
    setSent(true);
  };

  return (
    <InfoPage title="Contacto" subtitle="Fale com a equipa da plataforma">
      {sent ? (
        <div className="text-center py-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mensagem enviada!</h2>
          <p className="text-sm text-gray-600">
            Obrigado pelo seu contacto. A equipa responderá o mais brevemente possível.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8B0000]/10">
                <Mail className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Email</h2>
                <p className="text-sm text-gray-600">eha-team@isptec.co.ao</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8B0000]/10">
                <School className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Instituição</h2>
                <p className="text-sm text-gray-600">
                  ISPTEC — Instituto Superior Politécnico de Tecnologias e Ciências
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8B0000]/10">
                <MapPin className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Localização</h2>
                <p className="text-sm text-gray-600">Luanda, Angola</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors((prev) => ({ ...prev, name: '' }));
                }}
                className={`w-full px-4 py-3 border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent`}
                placeholder="O seu nome"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                className={`w-full px-4 py-3 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  setErrors((prev) => ({ ...prev, message: '' }));
                }}
                className={`w-full px-4 py-3 border ${
                  errors.message ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent resize-none`}
                placeholder="Escreva a sua mensagem..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            <Button type="submit" variant="primary" className="w-full gap-2">
              <Send className="w-4 h-4" />
              Enviar Mensagem
            </Button>
          </form>
        </div>
      )}
    </InfoPage>
  );
}
