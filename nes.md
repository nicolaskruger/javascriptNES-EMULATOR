# NES

## dicionário

| info    | significado                                                           |
| ------- | --------------------------------------------------------------------- |
| PGR-ROM | area da rom utilizada para armazenar o codigo do jogo, bloco com 16kB |
| CHR-ROM | rom utilizada para armazenar informações graficas, bloco 8kb          |

## catucho

- memoria ROM
- conector de 72 pinos para se comunicar com o console
- memoriara RAM para salvar o jogo

### iNES

- arquivo lido **.nes**

somente com o que tinha na rom n é possivel emular o jogo

foi criado um acabeçalho de **16Bytes** para identificar caracteristicas do jogo

| **Byte de inicio** | **tamanho do byte** | **conteudo**                                      |
| ------------------ | ------------------- | ------------------------------------------------- |
| 0                  | 3                   | contem string NES                                 |
| 3                  | 1                   | conten o valor **$1a** para identificar o arquivo |
| 4                  | 1                   | Número de bancos de PGR-ROM                       |
| 5                  | 1                   | numero de bancos CHR-ROM                          |
| 6                  | 1                   | ver tablela **byte de controle 1**                |
| 7                  | 1                   | ver tabela **byte de controle 2**                 |
| 8                  | 1                   | número de bancos da RAM cada bloco tem **8kB**    |

**byte de controle 1**

| bit   | significado                                                    |
| ----- | -------------------------------------------------------------- |
| 0     | tipod de espelahamento 0 horizontal 1 vertical                 |
| 1     | indica a preznçã de memória ram do cartucho                    |
| 2     | idica a presençã de 512byte utilizado par alguns memory mapper |
| 3     | indica q o jogo eh dividido em 4 telas                         |
| 4 - 7 | 4 bits menos significativos do memory Mapper                   |

**byte de controle 2**

| bit   | significado                                |
| ----- | ------------------------------------------ |
| 0 - 3 | não utilizados                             |
| 4 - 7 | bits mais significativosa do memory mapper |

depoi do cabeçalho vem o 512byte trainer caso presente. Proximo vem PRG-ROM depois CHR-ROM

512 byte triner -> PRG-ROM -> CHR-ROM

**memory mapper :** memoria adicionada no proprio cartucho para suportar jogos maiores.
ele carrega da memoria alguns bancos de dados do cartucho, conforme o software solicita, é realizada a troca dos bancos de dados.

- NROM: não é utilizado nenhum memory mapper. **doken kong**, **super mario bros**
- UNROM: primeiro memory mapper criado, suporta somente troca de banco de dados PRG-ROM. Permite at´r 8 banco de 16 KB de PRG-ROM utilizem esse mapeamento. **BomberMan 2**, **Castlevania** e **Final Fantasy 1 e 2**
- CNROM, suporta somente a troca de banco de CHR-ROM, permiote que jogos com graficos melhores fossem criados. **paper boy** e **dragon quest**
- MMC1: é o memory mapper mais famoso e permite a troca de banco de PRG-ROM e CHR-ROM, com até o bancos 8 de 16kB de PRG-ROM. **Castlevania 2**, **Legend of Zelda** e **megaman 2**.

## CPU

- console de 8bits
- variação do processador **6502** da MOS Technology, chamado de **2A03** suporta som (pAPU)

### 2A03

- pode manipular som
- little endian são armazenados no endereço menos significativo primeiro por exemplo o endereço 0x1234 é amazenado 0x34 no (x) e 0x12 no (x + 1)

## mapa de memória

divididade em 3 memorias

- ROM do acartucho
- RAM da CPU
- I/O registers

comunicação feita por barramentos de 8 bits

A CPU pode endereçar até 64 kB $0000 $ffff

areas epelhadas, o mesmo conteúdo é escrito em mais de uma area

| endereço        | tipo          | conteúdo                                                       |
| --------------- | ------------- | -------------------------------------------------------------- |
| 0x0000 - 0x2000 | RAM           | pagina 0, pilha e RAM                                          |
| 0x0000 - 0x00ff |               | modos de endereçamento para execução mais rápida               |
| 0x2000 - 0x401f | i/o registers |                                                                |
| 0x2000 - 0x2008 | i/o registers | bytes para se comunicar com a PPU                              |
| 0x4000 - 0x401f | i/o registers | bytes para se comunicar com a APU                              |
| 0x4020 - 0x6000 | expansion ROM | utilizadas por aguns memory mappers                            |
| 0x6000 - 0x7fff | SRAM          | utilizada para armazenar o conteúdo da memória ram do cartucho |

A partir do **0x8000** é endereçado o PRG-ROM (16KB)

caso tenha **1** banco é utilizado **0x8000**
caso tenha **2** é utilizado **0x8000** e **0xC000**
caso tenha **mais** é necessario **memory mapper**

**zero page**: 0x0000 - 0x00ff utilizado por certos modos de endereçamento.
**mirror**: memoria 0x0000 - 0x07ff são espelahdas então se algo é escrito nop endereço 0x0000 é espelahdo em 0x0800, 0x1000 e 0x1800.
**memoryy mapped I/O regiters**: 0x2000 - 0x401f
**0x2000 - 0x2007**: é espelhada a cada 8bytes na região 0x2008 - 0x3fff.
**SRAM**: save ram usada para salvar o precesso do jogo.
**PRG-ROM**: 0x8000 e 0xC000(quando tem dois bancos de memória) uzado para armazenar memória do cartucho

### registradores

total de **6** registradotres

- PC (program conter)
- SP STK (stack pointer)
- P STATUS (status register)
- ACC (accumulator)
- X
- Y

**PC (program counter)**: 16 bits armazena o endereçõ da proxima instrução, encrementa a cada instrução q é feita, tmb altera seu valor em instruções do tipo **branch** e instruções do tipo **jump**.

**SP STK (stack pointer)**: é um registrador de 8bits que controla o estado atual da pilha, um onto interesante é q ele trabalha de forma invertida ou seja quando é acecentado algo na pilha seu valor diminui e quando retirado o valor aumenta, seu valor varia de **0x0100 - 0x1ff**

**P STATUS (status register)**: 8 bits com 7 flags

- Carry flag(C) - definida como 1 se a instrução resulta em overflow ou un underflow. bit 1
- Zerro flag(Z) - definida como 1 se a altima instrução resultou em zero. bit 2
- Decimal Mode(D) - essa flag não é utilizada no processador da nintendo. bit 3
- Break (B) - 1 intrução BRK foi executada, e uma interrupção IRQ irá ocorrer. bit 4
- overflow (V) - 1 quando o resultado de uma operação não é o espedo por exemplo soma de dois numeros positivos da um número negativo, soma de dois numero negativo da um positivo. bit 6
- Negative (N) - 1 quando a instrução enterior resulta em um número negativo bit 7

**ACC A (accumulator)**: 8 bits armazena resulta de operações aritmeticas e lógicas ou definindo como um valor vindo da memória.

**X**: 8 bits é utilizado como um contador ou como offset para alguns modos de endereça~mento de memória. definido coo valor vindo da memória, e pode ser usado para obter ou colocar o valor do stack pointer.

**Y**: 8bits contador e offset,não afeta o stack pointer

### Modo de Endereçamento

13 mode de endereçamento

**implied**: utilizado por instruções que não manipulam endereços, como instrução NOP, que não possui nenhum operador.

**immediate**: instruções que utilizam o mode Immediate recebe um valor que é utilizado diretamente pela intrução.

```typescript
const PC = 0;

const value = PRG_ROM[PC + 1];
```

**zero page**: na posição de meoria **PC + 1** que serve como ponteiro para uma região da memoria Zeero Page (0x0000 - 0x00ff). Por exemplo no **PC + 1** ele tem o valor **0xaa**, então ele vai buscar na memoria o valor no endereço **aa**

```typescript
const PC = 0;

const addr = PRG_ROM[PC + 1];

const value = ZERO_PAGE[addr];
```

**Zero Page Index**: Similar ao **Zero Index** só adicina o valor do registrador x ou y;

```typescript
const PC = 0;

const addr = PRG_ROM[PC + 1];

const value = ZERO_PAGE[addr + X];
```

**Absolute**: endereçã com dois parametros

```typescript
const PC = 0;

const a = PRG_ROM[PC + 1];
const b = PRG_ROM[PC + 2];

const addr = (b << 8) | a;

const value = DATA[addr];
```

**Absolute Index**: mesma coisa que o absolute soh que adiciona o affset doregistrador x ou y

```typescript
const PC = 0;

const a = PRG_ROM[PC + 1];
const b = PRG_ROM[PC + 2];

const addr = (b << 8) | a;

const value = DATA[addr + x];
```

**Accumulator**: utiliza o valor do registrador accumuladot como operador.

**Indirect**: dois endereços para achar dois valores consecutivos que juntos vão achar outro valor

```typescript
const PC = 0;

const a = PRG_ROM[PC + 1];
const b = PRG_ROM[PC + 2];

const addr = (b << 8) | a;

const x = DATA[addr];
const y = DATA[addr + 1];

const finalAddr = (y << 8) | x;

const value = DATA[finalAddr];
```

**pre-indexed indirect**: parecido com o indirect mas não utilza-se de dois valores do PC e soma o offset do registrador **x**

```typescript
const PC = 0;

const a = PRG_ROM[PC + 1];

const x = DATA[a + X];
const y = DATA[a + X + 1];

const finalAddr = (y << 8) | x;

const value = DATA[finalAddr];
```

**pos-indexed indirect**: parecido com o pre-index porem o offset eh somado com o resultado final e o offset é o registrador **Y**.

```typescript
const PC = 0;

const a = PRG_ROM[PC + 1];

const x = DATA[a];
const y = DATA[a + 1];

const finalAddr = ((y << 8) | x) + Y;

const value = DATA[finalAddr];
```

**Relative**: é um modo de endereçãmento utilizado exclusivamente par instruções de desvio condicional.

```typescript
const PC = 0;

const value = PRG_ROM[PC + 1];

if (condition) {
  PC += 2 + value;
} else {
  PC += 2;
}
```

### instruções

56 instruções gerando um total de a151 combinações tem até 3 bytes podendo variar, diferentes instruçõse demoram diferentes ciclos de clock. Primeiro byte é o opcode os demais são operadores.

- operações aritmeticas: ADC(adição), SBC(subitração)
- operações logicas: ADN (memória + accumuladtor)
- operações de incremento e decremento: incrmento e decremento de 1 nos registradores x, y
- operações de pilha: PHA(Empilha o conteúdo de Acculator), PLP (Desempilhamento e armazena no Procesor Status).
- Operação de Load/Store - Carrga ou armazena valor na memória.
- operação de transferencia - Copia um valor de unregistrador par outro
- operações de deslocamento - Desloca o bit do acuumulador para esquerda ou para direita
- Jumps /Calls - quebra execução sequencial, e começã de um endereçõ especifico
- Branchse - para a execução sequencial e, começa de um endereço especifico. Se a condição estiver verdadeira.
- operação de status registes - alterar o valor do status register.
- system functions - efetua uma função que não é muito usada

### interrupções

geralmete são geradas por hardware, nes tem 3 interruções **NMI, IRQ, e Reset**. Quando gerada NES empilha os registradores **PC** e **STATUS P** na pilha. carrega o endereçõ da rotina da interrupção no PC, e a pos executa um **IRQI**, return from interrupt

O endereçõ que é direcionado quando uma interrupção ocorre é armazenado no vector table 0xfffa - 0xffff.

passo a passo da interrupção:

1. reconhece que uma interrupção ocorreu.
2. completa a interrução da instrução atual.
3. seta o PC e o StATUS na stack
4. seta a flag de interrupãso para empedir outras interrupções.
5. Carrega o endereço da interrupção da vector table para o PC
6. Executa a interrupção.
7. Depois de executar o RTI(Return from interrupt). Ele pega os valores do PC e STATUS da stack.
8. Volta a execução do programa.

**IRQ**: gerado por certos memory mapper. É ignorado pelo processador caso a flaq de desabilitar instruções estiver ativa. Pode ser ativada pro instruções do tipo BRK, e o sistema vai para os endereos de memória 0xfffe e 0xffff.

**NMI** (Non-masked Interrupt): gerada pala PPU quando ocorre uma V-BLank oocorre no final de cada frame. NMIs não são afetadas pela flag de desabilitar interrupção. Porem ela pode ser previnida se o bit 7 do registrador de controle da PPU from 0. na NMI o sitema pula para os endereços 0xfffa 0xfffb.

**Reset**: Ocorre quando o sistema inicia e o o usuarioo aperta o botão de reset. Ele vai para o endereço 0xfffc.

pririty

reset => NMI => IRQ

## PPU

PPU (picture processing unit) chip (2C02). Comunicação com a CPU se da por alguns registradores de I/O na memória da CPU. PPU endereço de 16bits mas registrador de entrada tem 8bits, é feita duas escritas para definir os endereços.

para renderizar pixels, utiliza-se do método **scanline** que consiste em renderizar uma linha de cada vez. Tela do NES 256x240, mas no scanline execute 262.

- 0 - 239: são renderizados os pixels
- 240: não faz nada
- 241 - 260: ocorre o V-Blank que é o momento q a PPU não está em uso, então é possível acessar e transferir dados da memória para a PPU. O inicio da V-Blank se da após a interrupção NMI.

### Mapa de memória

possui memoria **VRAM**, pode endereçar até 64kB, apesar de possuir memória física de somente 16kB

#### VRAM

- **0x0000 - 0x2000 pattern table**: pattern table 0 (0x0000 - 0x1000), patter table 1 (0x1000 - 0x2000)
- **0x2000 - 0x3f00S name tables**
- **0x3f00 - 0x4000 palettes table**
- **0x4000 - 0x100000 mirror**

VRAM armazena: Tabela de Padrões, Tabela de Nomes e Paletas de Cores.

- 0x0000 - 0x1fff **Tabelas de Padrões**: Padrões que definem as formas dos tiles que dão origem as backgrounds e os sprites.
- 0x2000 - 0x2fff **Tabelas de Nomes**: São matrizes de números de tiles, que apontam para os tiles armazenados na região armazenados na região de memoria das tabelas padrões.
- 0x3000 - 0x3eff espelhamento da **Tabela de nomes**
- 0x3f00 - 0x3fff **paleta de cores**: são as cores que vão ser utilizada no backgound e nos sprites da tela atual.
- 0x4000 - fim: espelhamento

**SPR-RAM**: Memória separada utilizada para armazenar os atributos dos sprites é memoria da PPU.

**DMA** direct memory access: é Possível transferir até 256 bytes da SPR-RAM da CPU de uma única vez. Para isso é preciso setar o registrador de I/O da CPU 0x4014 e serrão transferidos 256bytes da região 0xXX00 - 0xXXff para a PPU.**conferir essa info**

por exemplo se o registrador 0x4014 for setado 0x43 as memoria a serem transferidas são 0x4300 - 0x43ff.

### Registradores

Os registradores utilizados pela PPU são alguns dos registradores I/O da memória da CPU. são eles 0x2000 - 0x2007 e 0x4014 para DMA. Os registradores 0x2000 - 0x2007 são espelhados 0x2008 - 0x3fff.

A CPU controla a PPU

- 0x2000 - 0x2001: registradores de controle, cada bit configura uma configuração especifica.
- 0x2002 registrador de status: sincroniza CPU e PPU.
- 0x2003 - 0x2004: registrador utilizados para escrever sprites. 0x2003 é o endereço da SPR-RAM e 0x2004 valor a ser escrito.
- 0x2005: é utilizado para alterar posição do scroll que diz qual pixel da Tabela de nomes está no topo esquerdo da tela. É feita duas escritas primeiro a posição X depois a Y.
- 0x2006 - 0x2007: Registrador por onde ocorre a transferência entre CPU e PPU.

#### **0x2000** escrita

- bit 0-1: seleciona um entre 4 tabelas de nome 0x2000(0), 0x2400(1), 0x2800(2), 0x2C00(3)
- bit 2: especifica a quantidade que ira incrementar no endereço 0 -> 1(horizontal), 1 -> 32(vertical)
- bit 3: Identifica em qual tabela padrão os sprites estão armazenados 0 -> 0x0000, 1 -> 0x1000
- bit 4: Especifique o tamanho dos Sprites em pixels 0 -> 8x8, 1 -> 8x16
- bit 6: muda o modo da PPU para mestre ou escravo. Isso não é utilizado pelo NES.
- bit 7: indica quando NMI deve ocorrer após o V-Blank

#### **0x2001** escrita

- bit 0: 0 -> colorido, 1 -> monocromático
- bit 1: 8 pixels esquerda background 0 -> esconder, 1 -> mostrar
- bit 2: 8 pixels esquerda sprite 0 -> esconder, 1 -> mostrar
- bit 3: 0 -> esconde background, 1 -> mostrar backgound
- bit 4: 0 -> esconde sprite, 1 -> mostra sprite
- bit 5 - 7: indica a cor caso esteja no modo monocromático, ou a intensidade das cores no modo colorido

#### **0x2002** leitura

- bit 4: 1 -> escrita na VRAM deve ser ignorada
- bit 5: 1 -> tem mais 8 sprites por scanline
- bit 6: 1 -> quando quando um pixel não transparente do sprite 0 sobrepõe um pixel não transparente do backgound
- bit 7: Indica quando ocorre V-Blank

#### **0x2003** escrita

Endereço a ser acessado na proxima escrita pelo SPR-RAM

#### **0x2004** escrita

Escreve o byte no endereço indicado pelo 0x2003

#### **0x2005** 2x escrita

posição do pixel que está no topo esquerdo da tela renderizado

#### **0x2006** 2x escrita

endereço da PPU que será utilizada para fazer escritas de dados vindos da CPU

#### **0x2007** leitura/ escrita

Escreve ou le dados da VRAM. Depois de escrito o registrador 0x2000 é incrementado

#### **0x4014** escrita

byte mais significativo do DMA do SPR-RAM

### Paleta de Cores

64 cores. Para cada quadro é escolhido 16 corea para backgound e 16 cores para sprites.

|                            |              |              |              |                     |
| -------------------------- | ------------ | ------------ | ------------ | ------------------- |
| 0x3f00 cor de fundo        | 0x3f01 cor 1 | 0x3f02 cor 2 | 0x3f03 cor 3 | paleta background 0 |
| 0x3f04 espelhamento 0x3f00 | 0x3f05 cor 1 | 0x3f06 cor 2 | 0x3f07 cor 3 | paleta background 1 |
| 0x3f08 espelhamento 0x3f00 | 0x3f09 cor 1 | 0x3f0a cor 2 | 0x3f0b cor 3 | paleta background 2 |
| 0x3f0c espelhamento 0x3f00 | 0x3f0d cor 1 | 0x3f0e cor 2 | 0x3f0f cor 3 | paleta background 3 |
| 0x3f10 espelhamento 0x3f00 | 0x3f11 cor 1 | 0x3f12 cor 2 | 0x3f13 cor 3 | paleta sprite 0     |
| 0x3f14 espelhamento 0x3f00 | 0x3f15 cor 1 | 0x3f16 cor 2 | 0x3f17 cor 3 | paleta sprite 1     |
| 0x3f18 espelhamento 0x3f00 | 0x3f19 cor 1 | 0x3f1a cor 2 | 0x3f1b cor 3 | paleta sprite 2     |
| 0x3f1c espelhamento 0x3f00 | 0x3f1d cor 1 | 0x3f1e cor 2 | 0x3f1f cor 3 | paleta sprite 3     |

### tablea padrão

cada tile é formado por 16 bytes, esses bytes são divididos em duas tabelas de 8bytes, a primeira é a tabela que representa o bit 0 e a segunda o bit 1 assim podendo gera até quato combinações (00, 01, 10, 11). Cada combinação é uma cor na tabela de cores.

exemplo

tabela 0  

0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 1 1 1 1 1 1 0
0 0 1 1 1 1 0 0

tabela 1

0 0 1 1 1 1 0 0
0 1 1 1 1 1 1 0
0 1 1 1 1 1 1 0
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
0 1 0 0 0 0 1 0
0 0 0 0 0 0 0 0

tabela resultant

0 0 2 2 2 2 0 0
0 2 2 2 2 2 2 0
0 2 2 2 2 2 2 0
2 2 2 2 2 2 2 2
2 2 2 2 2 2 2 2
2 2 2 2 2 2 2 2
0 3 1 1 1 1 3 0
0 0 1 1 1 1 0 0

### tabela de nomes

30x32 (30 colunas com 32 linhas) de 8x8pixels. Nos dando uma resolução de 30x32tiles ou 240x256pixels.

**tile** tem um byte.

A tabela de nomes tem um total 960 bytes.

### tabela de atributos

responsavel pelas cores dos tyles, ela posui 64bytes para endereçamento, utilizando um byte por endereçamento. ela endereça 4x4 tiles que da 2x2blocos que da 32x32pixels.

cada byte é dividido em 2bit, esse valor é o valor de uma cor especifica em cada bloco.

### scrolling

efeito utilizado em jogos 2D para efetuar a rolagem de tela tanto de forma horizontal como de forma vertical. Para isso é utilizado duas tabelas de nomes.

registrador **0x2005** indica em qual pixel está poscionada a parte esquera superior da tela. Para isso são efetuadas duas escritas. A escrita é sempre feita no V-blank.

### sprites

tiles de 8x8 pixels que pode ser renderizado em qualquer posição da tela.

os dados de cada sprite são formados por 4bytes

**byte 0 posdição Y**: começa no topo da tela é o eixo y.

**byte 1 numero do tile**: ponteiro para o número do tyle na **tabela padrão**.

**byte 2 numero de atributo**: info sobre cor e exebição

- bit 0-1: Paleta de cor utilizada.
- bit 2-4: não utilizado.
- bit 5: 0 frente bg, 1 atraz bg.
- bit 6: sprite gira horizontamente 90 graus.
- bit 7: sprite gira verticalmente 90 graus.

**byte 3 posição X**: começa no lado esquerdo da tela é o eixo x.

**SPR-RAM**: armazena até 64 sprites.Durante a scanline, a PPU verifiaca se tem alguma sprite que deva ser renderizada, para isso ela utiliza o eixo Y da sprite.

PPU so é capaz de renderizar 8 sprites por scanline e a ordem é definida polo armazenamento da sprite na SPR-RAM

o render da PPU é executado a cada scanline para dar ao personagem impreção de movimento.

**colisão tecnica Sprite 0 hit**: varifica se algum pixels da sprite está sobreposto a um pixel não tranparente do bg. Ai ocorre uma colisão e o sprite hit é definido como 1.
