<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Question;
use App\Models\StudentProfile;
use App\Models\Subject;
use App\Models\Trail;
use App\Services\StudentEnergyService;
use Illuminate\Database\Seeder;

class DemoEduRushSeeder extends Seeder
{
    private const LESSONS_PER_TRAIL = 7;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StudentProfile::query()->firstOrCreate(
            ['name' => 'Aluno Demo'],
            [
                'grade_year' => 1,
                'energy' => StudentEnergyService::DEFAULT_ENERGY,
                'energy_recharge_reference_at' => now(),
            ]
        );

        $subjectsBlueprint = $this->subjectsBlueprint();
        $subjectIds = [];

        foreach ($subjectsBlueprint as $subjectData) {
            $subject = Subject::query()->updateOrCreate(
                ['slug' => $subjectData['slug']],
                [
                    'name' => $subjectData['name'],
                    'description' => $subjectData['description'],
                    'color_hex' => $subjectData['color_hex'],
                    'icon' => $subjectData['icon'],
                    'is_active' => true,
                ]
            );

            $subjectIds[$subjectData['slug']] = $subject->id;
        }

        if (! empty($subjectIds)) {
            Trail::query()
                ->whereIn('subject_id', array_values($subjectIds))
                ->update(['is_active' => false]);
        }

        $difficultyBlueprints = $this->difficultyBlueprints();

        foreach ($subjectsBlueprint as $subjectData) {
            $subjectId = $subjectIds[$subjectData['slug']] ?? null;

            if (! $subjectId) {
                continue;
            }

            foreach ([1, 2, 3] as $year) {
                $topics = $subjectData['year_topics'][$year] ?? [];

                if (empty($topics)) {
                    continue;
                }

                foreach ($difficultyBlueprints as $difficultyIndex => $difficulty) {
                    foreach ([1, 2, 3] as $trailIndex) {
                        $topic = $topics[($trailIndex - 1) % count($topics)];
                        $variant = $difficulty['trail_variants'][$trailIndex - 1];
                        $trailSlug = sprintf(
                            '%s-%dano-%s-trilha-%d',
                            $subjectData['slug'],
                            $year,
                            $difficulty['slug'],
                            $trailIndex
                        );

                        $trailPosition = (($year - 1) * 9) + ($difficultyIndex * 3) + $trailIndex;

                        $trail = Trail::query()->updateOrCreate(
                            ['slug' => $trailSlug],
                            [
                                'subject_id' => $subjectId,
                                'title' => sprintf('%s — %s', $topic, $variant),
                                'description' => sprintf(
                                    'Trilha de %s para o %dº ano, nível %s, com foco em %s.',
                                    $subjectData['name'],
                                    $year,
                                    $difficulty['label'],
                                    mb_strtolower($topic)
                                ),
                                'position' => $trailPosition,
                                'grade_year' => $year,
                                'is_active' => true,
                            ]
                        );

                        $this->seedTrailLessonsAndQuestions(
                            $trail,
                            $subjectData,
                            $year,
                            $topic,
                            $difficulty,
                            $trailIndex
                        );
                    }
                }
            }
        }
    }

    /**
     * @param  array{name: string, slug: string}  $subjectData
     * @param  array{code: string, label: string, weight: int, xp_base: int}  $difficulty
     */
    private function seedTrailLessonsAndQuestions(
        Trail $trail,
        array $subjectData,
        int $year,
        string $topic,
        array $difficulty,
        int $trailIndex
    ): void {
        $lessonIds = [];
        $previousLessonId = null;

        for ($lessonIndex = 1; $lessonIndex <= self::LESSONS_PER_TRAIL; $lessonIndex++) {
            $lessonSlug = sprintf('%s-licao-%d', $trail->slug, $lessonIndex);
            $lessonTitle = sprintf('%s • Lição %d: %s', $topic, $lessonIndex, $this->lessonStageLabel($lessonIndex));
            $lessonObjective = sprintf(
                'No %dº ano de %s, desenvolver domínio de %s com complexidade %s.',
                $year,
                $subjectData['name'],
                mb_strtolower($topic),
                mb_strtolower($difficulty['label'])
            );
            $lessonContent = sprintf(
                "Esta lição trabalha %s em %s no %dº ano.\n\n" .
                "Você vai praticar leitura de enunciados, aplicação de conceito e revisão de erros com foco %s.\n\n" .
                "Ao final, registre o que aprendeu, o que ainda gera dúvida e qual estratégia usará na próxima atividade.",
                mb_strtolower($topic),
                $subjectData['name'],
                $year,
                mb_strtolower($difficulty['label'])
            );

            $lesson = Lesson::query()->updateOrCreate(
                ['slug' => $lessonSlug],
                [
                    'trail_id' => $trail->id,
                    'prerequisite_lesson_id' => $previousLessonId,
                    'title' => $lessonTitle,
                    'position' => $lessonIndex,
                    'objective' => $lessonObjective,
                    'content' => $lessonContent,
                    'xp_reward' => $difficulty['xp_base'] + ($lessonIndex * 5),
                    'difficulty' => $difficulty['code'],
                    'is_active' => true,
                ]
            );

            $previousLessonId = $lesson->id;
            $lessonIds[] = $lesson->id;

            $questions = $this->buildQuestions(
                $subjectData,
                $topic,
                $year,
                $difficulty,
                $trailIndex,
                $lessonIndex
            );

            foreach ($questions as $questionIndex => $questionData) {
                Question::query()->updateOrCreate(
                    [
                        'lesson_id' => $lesson->id,
                        'position' => $questionIndex + 1,
                    ],
                    [
                        'prompt' => $questionData['prompt'],
                        'options' => $questionData['options'],
                        'correct_option' => $questionData['correct_option'],
                        'explanation' => $questionData['explanation'],
                        'xp_reward' => 5,
                        'is_active' => true,
                    ]
                );
            }

            Question::query()
                ->where('lesson_id', $lesson->id)
                ->where('position', '>', count($questions))
                ->update(['is_active' => false]);
        }

        Lesson::query()
            ->where('trail_id', $trail->id)
            ->whereNotIn('id', $lessonIds)
            ->update(['is_active' => false]);
    }

    /**
     * @param  array{name: string, slug: string}  $subjectData
     * @param  array{label: string, weight: int}  $difficulty
     * @return array<int, array{prompt: string, options: array<int, string>, correct_option: int, explanation: string}>
     */
    private function buildQuestions(
        array $subjectData,
        string $topic,
        int $year,
        array $difficulty,
        int $trailIndex,
        int $lessonIndex
    ): array {
        $seed = ($year * 1000) + ($trailIndex * 100) + ($lessonIndex * 10) + $difficulty['weight'];
        $competencies = $this->subjectCompetencies($subjectData['slug']);
        $contexts = $this->subjectContexts($subjectData['slug']);
        $strategies = $this->subjectStrategies($subjectData['slug']);

        $focusCompetency = $competencies[$seed % count($competencies)];
        $context = $contexts[$seed % count($contexts)];
        $strategy = $strategies[$seed % count($strategies)];

        $questionOne = $this->composeQuestion(
            prompt: sprintf(
                'Sobre %s em %s, qual alternativa está correta?',
                mb_strtolower($topic),
                $subjectData['name']
            ),
            correct: $focusCompetency,
            distractorsPool: $competencies,
            explanation: sprintf(
                'O foco da lição é fortalecer a habilidade de %s com prática progressiva.',
                mb_strtolower($focusCompetency)
            ),
            seed: $seed + 1
        );

        $questionTwo = $this->composeQuestion(
            prompt: sprintf(
                'Ao estudar %s, qual estratégia é mais adequada para o contexto: %s?',
                mb_strtolower($topic),
                $context
            ),
            correct: $strategy,
            distractorsPool: [
                'Ignorar o enunciado e responder por tentativa.',
                'Memorizar respostas sem compreender o conceito.',
                'Pular etapas de revisão para ganhar tempo.',
                'Responder sem justificar a escolha.',
            ],
            explanation: 'A melhor estratégia combina compreensão, justificativa e revisão de erros.',
            seed: $seed + 2
        );

        $questionThree = $this->composeQuestion(
            prompt: sprintf(
                'Em uma avaliação sobre %s, o que indica domínio do conteúdo?',
                mb_strtolower($topic)
            ),
            correct: sprintf('Aplicar o conceito em uma situação nova e explicar o raciocínio com clareza.'),
            distractorsPool: [
                'Decorar termos sem conseguir aplicar em exemplos.',
                'Copiar a resolução sem compreender os passos.',
                'Evitar exercícios para não errar.',
                'Resolver apenas questões idênticas às já vistas.',
            ],
            explanation: 'Domínio real aparece quando o aluno transfere o conhecimento para novos problemas.',
            seed: $seed + 3
        );

        $questionFour = $this->composeQuestion(
            prompt: sprintf(
                'Durante a revisão de %s em %s, qual afirmação está correta?',
                mb_strtolower($topic),
                $subjectData['name']
            ),
            correct: 'Relacionar conceito, exemplo e justificativa melhora retenção e desempenho.',
            distractorsPool: [
                'Estudar apenas na véspera da prova garante aprendizagem profunda.',
                'Ignorar erros anteriores acelera o desenvolvimento.',
                'Não é necessário revisar conteúdos de aulas passadas.',
                'A leitura do enunciado é menos importante que a velocidade.',
            ],
            explanation: 'A aprendizagem se consolida com revisão ativa, contexto e correção de erros.',
            seed: $seed + 4
        );

        return [
            $questionOne,
            $questionTwo,
            $questionThree,
            $questionFour,
        ];
    }

    /**
     * @param  array<int, string>  $distractorsPool
     * @return array{prompt: string, options: array<int, string>, correct_option: int, explanation: string}
     */
    private function composeQuestion(
        string $prompt,
        string $correct,
        array $distractorsPool,
        string $explanation,
        int $seed
    ): array {
        [$options, $correctIndex] = $this->buildOptions($correct, $distractorsPool, $seed);

        return [
            'prompt' => $prompt,
            'options' => $options,
            'correct_option' => $correctIndex,
            'explanation' => $explanation,
        ];
    }

    /**
     * @param  array<int, string>  $pool
     * @return array{0: array<int, string>, 1: int}
     */
    private function buildOptions(string $correct, array $pool, int $seed): array
    {
        $cleanPool = [];

        foreach ($pool as $item) {
            if (! in_array($item, $cleanPool, true) && $item !== $correct) {
                $cleanPool[] = $item;
            }
        }

        $fallbacks = [
            'Aprofundar a análise com justificativa.',
            'Aplicar o conceito com exemplos.',
            'Revisar os erros e registrar aprendizados.',
            'Comparar estratégias antes de concluir.',
        ];

        foreach ($fallbacks as $fallback) {
            if (count($cleanPool) >= 3) {
                break;
            }

            if (! in_array($fallback, $cleanPool, true) && $fallback !== $correct) {
                $cleanPool[] = $fallback;
            }
        }

        $distractors = array_slice($cleanPool, 0, 3);
        $correctIndex = $seed % 4;
        $options = [];
        $distractorIndex = 0;

        for ($i = 0; $i < 4; $i++) {
            if ($i === $correctIndex) {
                $options[] = $correct;
                continue;
            }

            $options[] = $distractors[$distractorIndex] ?? 'Opção de apoio pedagógico.';
            $distractorIndex++;
        }

        return [$options, $correctIndex];
    }

    private function lessonStageLabel(int $lessonIndex): string
    {
        return match ($lessonIndex) {
            1 => 'Aquecimento',
            2 => 'Desenvolvimento',
            3 => 'Consolidação',
            4 => 'Aplicação prática',
            5 => 'Conexões avançadas',
            6 => 'Revisão estratégica',
            default => 'Desafio final',
        };
    }

    /**
     * @return array<int, array{
     *     code: string,
     *     label: string,
     *     slug: string,
     *     weight: int,
     *     xp_base: int,
     *     trail_variants: array<int, string>
     * }>
     */
    private function difficultyBlueprints(): array
    {
        return [
            [
                'code' => 'basic',
                'label' => 'Fácil',
                'slug' => 'facil',
                'weight' => 1,
                'xp_base' => 20,
                'trail_variants' => [
                    'Fundamentos',
                    'Prática guiada',
                    'Aplicações iniciais',
                ],
            ],
            [
                'code' => 'intermediate',
                'label' => 'Média',
                'slug' => 'medio',
                'weight' => 2,
                'xp_base' => 30,
                'trail_variants' => [
                    'Conexões',
                    'Resolução de problemas',
                    'Interpretação analítica',
                ],
            ],
            [
                'code' => 'advanced',
                'label' => 'Difícil',
                'slug' => 'dificil',
                'weight' => 3,
                'xp_base' => 40,
                'trail_variants' => [
                    'Desafios avançados',
                    'Síntese crítica',
                    'Projeto de revisão',
                ],
            ],
        ];
    }

    /**
     * @return array<int, array{
     *     name: string,
     *     slug: string,
     *     icon: string,
     *     color_hex: string,
     *     description: string,
     *     year_topics: array<int, array<int, string>>
     * }>
     */
    private function subjectsBlueprint(): array
    {
        return [
            [
                'name' => 'Português',
                'slug' => 'portugues',
                'icon' => '📚',
                'color_hex' => '#EF4444',
                'description' => 'Leitura, escrita e análise linguística com foco no Ensino Médio.',
                'year_topics' => [
                    1 => ['Leitura e interpretação', 'Gramática aplicada', 'Produção textual'],
                    2 => ['Literatura brasileira', 'Figuras de linguagem', 'Argumentação e coesão'],
                    3 => ['Redação ENEM', 'Análise discursiva', 'Interpretação crítica'],
                ],
            ],
            [
                'name' => 'Matemática',
                'slug' => 'matematica',
                'icon' => '🔢',
                'color_hex' => '#2563EB',
                'description' => 'Raciocínio lógico, álgebra, geometria e resolução de problemas.',
                'year_topics' => [
                    1 => ['Álgebra básica', 'Funções iniciais', 'Geometria plana'],
                    2 => ['Função quadrática', 'Trigonometria', 'Progressões'],
                    3 => ['Geometria analítica', 'Probabilidade', 'Análise combinatória'],
                ],
            ],
            [
                'name' => 'História',
                'slug' => 'historia',
                'icon' => '🏛️',
                'color_hex' => '#B45309',
                'description' => 'Processos históricos, análise de fontes e pensamento crítico.',
                'year_topics' => [
                    1 => ['Mundo antigo', 'Mundo medieval', 'Formação do mundo moderno'],
                    2 => ['Brasil colônia', 'Brasil império', 'República no Brasil'],
                    3 => ['Guerras mundiais', 'Guerra fria', 'História contemporânea'],
                ],
            ],
            [
                'name' => 'Geografia',
                'slug' => 'geografia',
                'icon' => '🌍',
                'color_hex' => '#059669',
                'description' => 'Espaço geográfico, território, sociedade e natureza.',
                'year_topics' => [
                    1 => ['Cartografia', 'Climatologia', 'Relevo e solos'],
                    2 => ['Geografia econômica', 'População e urbanização', 'Globalização'],
                    3 => ['Geopolítica', 'Questões ambientais', 'Regionalização mundial'],
                ],
            ],
            [
                'name' => 'Física',
                'slug' => 'fisica',
                'icon' => '⚛️',
                'color_hex' => '#0EA5E9',
                'description' => 'Leis da natureza, modelagem matemática e fenômenos físicos.',
                'year_topics' => [
                    1 => ['Cinemática', 'Dinâmica', 'Trabalho e energia'],
                    2 => ['Termologia', 'Óptica', 'Ondulatória'],
                    3 => ['Eletrostática', 'Eletrodinâmica', 'Física moderna'],
                ],
            ],
            [
                'name' => 'Química',
                'slug' => 'quimica',
                'icon' => '🧪',
                'color_hex' => '#14B8A6',
                'description' => 'Estrutura da matéria, transformações químicas e aplicações.',
                'year_topics' => [
                    1 => ['Estrutura atômica', 'Tabela periódica', 'Ligações químicas'],
                    2 => ['Funções inorgânicas', 'Estequiometria', 'Soluções'],
                    3 => ['Química orgânica', 'Eletroquímica', 'Equilíbrio químico'],
                ],
            ],
            [
                'name' => 'Biologia',
                'slug' => 'biologia',
                'icon' => '🧬',
                'color_hex' => '#16A34A',
                'description' => 'Vida, evolução, genética e equilíbrio dos ecossistemas.',
                'year_topics' => [
                    1 => ['Citologia', 'Histologia', 'Bioquímica celular'],
                    2 => ['Genética', 'Evolução', 'Fisiologia humana'],
                    3 => ['Ecologia', 'Biotecnologia', 'Saúde coletiva'],
                ],
            ],
            [
                'name' => 'Inglês',
                'slug' => 'ingles',
                'icon' => '🇬🇧',
                'color_hex' => '#6366F1',
                'description' => 'Leitura, interpretação, vocabulário e comunicação em inglês.',
                'year_topics' => [
                    1 => ['Reading strategies', 'Basic grammar', 'Everyday vocabulary'],
                    2 => ['Text genres', 'Verb tenses', 'Argumentative language'],
                    3 => ['Academic reading', 'Critical interpretation', 'Exam preparation'],
                ],
            ],
            [
                'name' => 'Artes',
                'slug' => 'artes',
                'icon' => '🎨',
                'color_hex' => '#DB2777',
                'description' => 'Expressão artística, estética e repertório cultural.',
                'year_topics' => [
                    1 => ['Elementos visuais', 'História da arte', 'Processos criativos'],
                    2 => ['Arte brasileira', 'Linguagens artísticas', 'Análise estética'],
                    3 => ['Arte contemporânea', 'Projetos autorais', 'Curadoria e crítica'],
                ],
            ],
            [
                'name' => 'Filosofia',
                'slug' => 'filosofia',
                'icon' => '💭',
                'color_hex' => '#7C3AED',
                'description' => 'Pensamento filosófico, ética, lógica e argumentação.',
                'year_topics' => [
                    1 => ['Origem da filosofia', 'Ética clássica', 'Lógica inicial'],
                    2 => ['Filosofia moderna', 'Política e sociedade', 'Teoria do conhecimento'],
                    3 => ['Filosofia contemporânea', 'Bioética', 'Pensamento crítico'],
                ],
            ],
            [
                'name' => 'Sociologia',
                'slug' => 'sociologia',
                'icon' => '👥',
                'color_hex' => '#0F766E',
                'description' => 'Sociedade, cultura, cidadania e análise social.',
                'year_topics' => [
                    1 => ['Cultura e identidade', 'Instituições sociais', 'Socialização'],
                    2 => ['Trabalho e desigualdade', 'Movimentos sociais', 'Estado e cidadania'],
                    3 => ['Mídia e sociedade', 'Globalização e redes', 'Juventudes e política'],
                ],
            ],
        ];
    }

    /**
     * @return array<int, string>
     */
    private function subjectCompetencies(string $subjectSlug): array
    {
        return match ($subjectSlug) {
            'portugues' => [
                'Identificar tese e argumentos em textos.',
                'Aplicar regras de concordância e regência.',
                'Produzir parágrafos com coesão e coerência.',
                'Reconhecer efeitos de sentido com figuras de linguagem.',
                'Comparar gêneros textuais em diferentes contextos.',
                'Revisar a escrita com foco em clareza e precisão.',
            ],
            'matematica' => [
                'Interpretar dados e variáveis com precisão.',
                'Resolver situações-problema por etapas.',
                'Aplicar propriedades algébricas em cálculos.',
                'Representar relações com tabelas e gráficos.',
                'Validar resultados por estimativa e verificação.',
                'Argumentar matematicamente com clareza.',
            ],
            'historia' => [
                'Analisar fontes históricas em seu contexto.',
                'Relacionar permanências e mudanças históricas.',
                'Compreender processos sociais de longa duração.',
                'Comparar interpretações sobre o mesmo período.',
                'Reconhecer agentes históricos e seus interesses.',
                'Argumentar com base em evidências históricas.',
            ],
            'geografia' => [
                'Ler mapas, escalas e representações cartográficas.',
                'Relacionar sociedade, economia e território.',
                'Interpretar dinâmicas populacionais e urbanas.',
                'Analisar impactos ambientais em diferentes escalas.',
                'Compreender fluxos globais e redes geográficas.',
                'Explicar desigualdades regionais com dados.',
            ],
            'fisica' => [
                'Modelar fenômenos com grandezas físicas.',
                'Aplicar leis físicas em situações do cotidiano.',
                'Interpretar gráficos e tabelas experimentais.',
                'Relacionar teoria e evidência experimental.',
                'Estimar ordens de grandeza em problemas.',
                'Explicar resultados com linguagem científica.',
            ],
            'quimica' => [
                'Relacionar estrutura da matéria e propriedades.',
                'Interpretar transformações químicas.',
                'Aplicar cálculos estequiométricos com método.',
                'Classificar substâncias e misturas.',
                'Analisar equilíbrio e velocidade de reação.',
                'Conectar química a fenômenos do cotidiano.',
            ],
            'biologia' => [
                'Compreender organização dos seres vivos.',
                'Relacionar genética e hereditariedade.',
                'Explicar processos fisiológicos essenciais.',
                'Analisar relações ecológicas e ambientais.',
                'Interpretar dados biológicos em gráficos.',
                'Avaliar impactos humanos sobre ecossistemas.',
            ],
            'ingles' => [
                'Identificar ideia principal em textos em inglês.',
                'Inferir sentido de palavras pelo contexto.',
                'Reconhecer estruturas gramaticais em uso.',
                'Compreender propósito comunicativo de gêneros.',
                'Relacionar vocabulário a situações reais.',
                'Interpretar posicionamentos em textos argumentativos.',
            ],
            'artes' => [
                'Reconhecer elementos visuais e sonoros.',
                'Analisar obras em seus contextos culturais.',
                'Comparar linguagens artísticas distintas.',
                'Justificar escolhas estéticas em produção autoral.',
                'Interpretar símbolos e significados na obra.',
                'Relacionar arte e sociedade com criticidade.',
            ],
            'filosofia' => [
                'Identificar problemas filosóficos centrais.',
                'Comparar argumentos de diferentes autores.',
                'Aplicar princípios éticos a situações concretas.',
                'Avaliar consistência lógica de argumentos.',
                'Relacionar filosofia e vida social.',
                'Construir posicionamento crítico fundamentado.',
            ],
            default => [
                'Analisar fatos sociais com olhar crítico.',
                'Relacionar indivíduo, cultura e sociedade.',
                'Interpretar dados e indicadores sociais.',
                'Compreender instituições e papéis sociais.',
                'Debater cidadania e participação política.',
                'Argumentar com base em evidências sociológicas.',
            ],
        };
    }

    /**
     * @return array<int, string>
     */
    private function subjectContexts(string $subjectSlug): array
    {
        return match ($subjectSlug) {
            'matematica' => [
                'organização de um orçamento mensal',
                'interpretação de gráficos em uma notícia',
                'planejamento de tempo de estudo',
                'estimativa de consumo de água da casa',
                'análise de descontos em compras',
                'comparação de trajetos e distâncias',
            ],
            'fisica' => [
                'movimento de um ônibus urbano',
                'uso de espelhos e lentes no cotidiano',
                'consumo elétrico em casa',
                'funcionamento de um chuveiro elétrico',
                'transferência de calor em recipientes',
                'propagação do som em ambientes fechados',
            ],
            'quimica' => [
                'preparo de soluções em laboratório escolar',
                'leitura de rótulos de produtos domésticos',
                'processos de oxidação no cotidiano',
                'tratamento de água para consumo',
                'fermentação em alimentos',
                'reação química em pilhas e baterias',
            ],
            'biologia' => [
                'hábitos alimentares e saúde',
                'vacinação e prevenção de doenças',
                'equilíbrio ecológico em áreas urbanas',
                'uso responsável de recursos naturais',
                'hereditariedade em características familiares',
                'impactos ambientais em biomas brasileiros',
            ],
            default => [
                'situação de sala de aula com debate orientado',
                'análise de uma notícia recente',
                'projeto interdisciplinar da escola',
                'resolução de um estudo de caso',
                'interpretação de dados em atividade avaliativa',
                'produção de síntese crítica em grupo',
            ],
        };
    }

    /**
     * @return array<int, string>
     */
    private function subjectStrategies(string $subjectSlug): array
    {
        return match ($subjectSlug) {
            'portugues' => [
                'Ler o texto integralmente e marcar argumentos antes de responder.',
                'Comparar versões do parágrafo para melhorar coesão e clareza.',
                'Reescrever trechos observando pontuação e concordância.',
                'Mapear ideias principais e secundárias com palavras-chave.',
            ],
            'ingles' => [
                'Identificar cognatos, falso cognatos e contexto antes de traduzir.',
                'Ler o enunciado e localizar palavras-chave no texto.',
                'Usar pistas do gênero textual para inferir sentido.',
                'Relacionar título, imagens e parágrafos para interpretar melhor.',
            ],
            default => [
                'Resolver a atividade por etapas e justificar cada decisão.',
                'Relacionar conceito, exemplo e conclusão na mesma resposta.',
                'Revisar erros anteriores antes de iniciar a nova questão.',
                'Comparar duas estratégias e escolher a mais consistente.',
            ],
        };
    }
}
