import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/ui/back-button"
import { Shield, Clock, Wrench, FileText } from "lucide-react"

export default function GarantiaPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Garantia</h1>
            <p className="text-muted-foreground">Informações sobre garantia dos produtos TechStore</p>
          </div>

          <div className="grid gap-6">
            {/* Tipos de Garantia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Tipos de Garantia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Garantia Legal</h4>
                    <p className="text-muted-foreground text-sm">
                      90 dias para produtos duráveis, conforme Código de Defesa do Consumidor
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Garantia do Fabricante</h4>
                    <p className="text-muted-foreground text-sm">
                      Período adicional oferecido pelo fabricante do produto
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prazos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Prazos de Garantia por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Smartphones e Tablets</span>
                    <span className="text-muted-foreground">12 meses</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Notebooks e Computadores</span>
                    <span className="text-muted-foreground">12 meses</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Eletrodomésticos Grandes</span>
                    <span className="text-muted-foreground">24 meses</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Eletrodomésticos Pequenos</span>
                    <span className="text-muted-foreground">12 meses</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Acessórios e Periféricos</span>
                    <span className="text-muted-foreground">6 meses</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">TVs e Monitores</span>
                    <span className="text-muted-foreground">12 meses</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Como acionar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2" />
                  Como Acionar a Garantia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Identifique o Problema</h4>
                      <p className="text-muted-foreground">Descreva detalhadamente o defeito apresentado</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Reúna a Documentação</h4>
                      <p className="text-muted-foreground">Nota fiscal, termo de garantia e fotos do produto</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Entre em Contato</h4>
                      <p className="text-muted-foreground">Ligue para 0800 123 4567 ou abra um chamado online</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Aguarde o Retorno</h4>
                      <p className="text-muted-foreground">Nossa equipe analisará e entrará em contato em até 24h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* O que cobre */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />O que a Garantia Cobre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3">✓ Coberto pela Garantia</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Defeitos de fabricação</li>
                      <li>• Problemas de funcionamento</li>
                      <li>• Componentes com defeito</li>
                      <li>• Falhas no software original</li>
                      <li>• Problemas elétricos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3">✗ Não Coberto pela Garantia</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Danos por mau uso</li>
                      <li>• Quedas e impactos</li>
                      <li>• Contato com líquidos</li>
                      <li>• Desgaste natural</li>
                      <li>• Modificações não autorizadas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
