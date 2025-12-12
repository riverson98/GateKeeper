# Arquitetura limpa no módulo Resident

Este guia descreve como o projeto aplica Clean Architecture / DDD e SOLID para o fluxo de `Resident`.

## Visão geral das camadas

- **Domain (Entidades e VO)**: regras de negócio puras, sem dependências externas.
- **Application (Use cases)**: orquestram o domínio via contratos; convertem dados com DTOs/mappers.
- **Infrastructure (Adapters)**: implementações concretas dos contratos (ex.: repositórios in-memory).
- **Framework/Module (Config)**: ligação de abstrações com implementações via módulos Nest.

## Conceitos-chave

- **Regra de dependência**: Application e Domain dependem apenas de abstrações, nunca de detalhes de infra. Ex.: `CreateResidentUseCase` recebe `ResidentContracts`.
- **Limites de camada**: DTOs/mappers fazem a tradução entre o “mundo externo” e o domínio.
- **Transporte de objetos simples**: DTOs (`CreateResidentInputDto`, `ResidentOutputDto`) carregam apenas dados primitivos/POJOs.
- **Inversão de dependência**: `ResidentModule` vincula `ResidentContracts` -> `ResidentImplContracts`.

## Entidades (regras cruciais de negócio)

- `ResidentEntity`: valida nome/telefone, gera `createdAt`, encapsula operações de domínio (`addDeliveryCode`, `relocateTo`, `hasDeliveryCode`). Mantém `UnitObjectValue` e `DeliveryIdentifierObjectValue`.
- Value Objects:
  - `UnitObjectValue`: valida número e complemento da unidade.
  - `DeliveryIdentifierObjectValue`: valida código e provedor (ex.: código IFOOD com 4 dígitos).
- Base: `GenericEntity` provê identidade (`uuid`) e serialização (`toJSON`).

## Use cases (orquestram e conhecem as entidades)

- `CreateResidentUseCase`: cria a entidade, aplica regras de negócio (adicionar delivery codes), persiste via contrato e emite evento de domínio (`delivery.created`). Resultado convertido com `ResidentMapper`.
- Contratos: `ResidentContracts` estende `GenericContracts` definindo a interface do repositório que a aplicação espera.

## Interfaces Adaptativas (DTOs e Mapper)

- Entrada: `CreateResidentInputDto` com validações de transporte (`class-validator`), incluindo VO aninhados (`UnitInputDto`, `DeliveryCodeInputDto`).
- Saída: `ResidentOutputDto` descreve o que retorna para o mundo externo (id, dados da unidade, codes).
- Mapper: `ResidentMapper.toOutput` transforma `ResidentEntity` em DTO simples, mantendo a regra de exposição de dados.

## Infra (Detalhes / Adapters)

- `InMemoryImplContracts`: repositório genérico em memória que cumpre `GenericContracts` (save, find, delete).
- `ResidentImplContracts`: especializa o repositório in-memory para `ResidentEntity` e implementa `ResidentContracts`.
- Erros técnicos/domínio reutilizáveis: `EntityValidationError`, `NotFoundError`.

## Ligação da abstração com a implementação (Modules)

- `ResidentModule`: registra o provider `{ provide: ResidentContracts, useClass: ResidentImplContracts }` para que o use case receba a implementação concreta sem conhecer detalhes.
- `SharedModule`: ponto de composição para providers compartilháveis (expansível).

## Mapa mental resumido

1. **Entidades**: regras cruciais de negócio (`ResidentEntity`, VOs).
2. **Use cases**: orquestram entidades e dependem de contratos (`CreateResidentUseCase`).
3. **Interfaces adaptativas**: DTOs + mapper traduzem domínio <-> fronteira.
4. **Infra**: detalhes de persistência/eventos; implementações concretas dos contratos.

## Como evoluir mantendo a limpeza

- Novos casos de uso: crie na camada `application`, dependa só de contratos.
- Novos provedores de persistência: implemente `ResidentContracts` em infra (ex.: Prisma/TypeORM) e troque o binding no módulo.
- Novas validações de negócio: coloque em entidades/VOs, não em DTOs ou controllers.
- Novos eventos: emita no use case e trate listeners em módulos de interface/infra.
