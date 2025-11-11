import { SearchBar } from './SearchBar';
import { QuickAccessCard } from './QuickAccessCard';
import { FileText, BookOpen, Shield, ClipboardList } from 'lucide-react';

export function Homepage() {
  return (
    <div className="not-content w-full">
      <style>{`
        /* Hide Starlight header completely - we'll clone the search button */
        .page header.header {
          display: none !important;
        }
        /* Hide Starlight hero/title section */
        .hero {
          display: none !important;
        }
        /* Remove border/separator from content-panel */
        .content-panel {
          border: none !important;
          border-top: none !important;
          padding-top: 0 !important;
        }
        /* Hide specific Starlight-generated title */
        h1#_top,
        h1.astro-chcp2eki {
          display: none !important;
        }
        /* Hide all hr separators on homepage */
        .main-frame hr,
        .sl-container hr,
        hr {
          display: none !important;
        }
        /* Remove underline from card links */
        a.no-underline,
        a.no-underline:hover,
        a.no-underline:focus,
        a.no-underline * {
          text-decoration: none !important;
        }
        /* Adjust main content padding */
        .main-frame {
          padding-top: 2rem !important;
        }
      `}</style>
      <div className="flex flex-col items-center gap-12 py-8 px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--sl-color-text)' }}
          >
            Base de Conhecimento - Saúde
          </h1>
          <p
            className="text-lg md:text-xl mb-8"
            style={{ color: 'var(--sl-color-gray-2)' }}
          >
            Bem-vindo à plataforma de documentação e conhecimento para saúde pública
          </p>
        </div>

        {/* Central Search Bar */}
        <div className="w-full max-w-2xl">
          <SearchBar />
        </div>

        {/* Quick Access Cards */}
        <div className="w-full max-w-6xl">
          <h2
            className="text-2xl font-semibold mb-6 text-center"
            style={{ color: 'var(--sl-color-text)' }}
          >
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickAccessCard
              title="Formulários e Fichas"
              description="Acesse formulários de notificação, requisição de exames e outras fichas essenciais"
              href="/formularios-e-fichas/"
              icon={ClipboardList}
            />
            <QuickAccessCard
              title="Manuais e Guias"
              description="Consulte manuais operacionais e guias de boas práticas"
              href="/manuais-e-guias/"
              icon={BookOpen}
            />
            <QuickAccessCard
              title="Protocolos e Normas"
              description="Explore protocolos clínicos e normas técnicas atualizadas"
              href="/protocolos-e-normas/"
              icon={Shield}
            />
            <QuickAccessCard
              title="Todos os Documentos"
              description="Navegue por toda a base de documentos organizados por categoria"
              href="/formularios-e-fichas/"
              icon={FileText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
