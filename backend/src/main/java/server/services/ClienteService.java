package server.services;

import server.controllers.dtos.CriarClienteDTO;
import server.domain.VO.Endereco;
import server.domain.entities.Cliente;
import server.domain.exceptions.ClienteJaExisteException;
import server.infrastructure.repositories.interfaces.ClienteRepositoryInterface;

public class ClienteService {

    private final ClienteRepositoryInterface clienteRepository;

    public ClienteService(ClienteRepositoryInterface clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente criar(CriarClienteDTO dto) {

        validarCpf(dto.cpf());

        if (clienteRepository.existePorCpf(dto.cpf())) {
            throw new ClienteJaExisteException(
                    "Já existe um cliente com este CPF."
            );
        }

        Endereco endereco = new Endereco(
                dto.rua(),
                dto.numero(),
                dto.logradouro(),
                dto.cep()
        );

        Cliente cliente = new Cliente(
                dto.nome(),
                dto.senha(),
                dto.cpf(),
                endereco
        );

        clienteRepository.salvar(cliente);

        return cliente;
    }

    public Cliente buscar(Long id) {
        return clienteRepository.buscarPorId(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado."));
    }

    private void validarCpf(String cpf) {

        if (cpf == null || cpf.isBlank()) {
            throw new IllegalArgumentException(
                    "CPF é obrigatório."
            );
        }

        // Validação futura
    }
}
